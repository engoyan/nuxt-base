import PocketBase from "pocketbase";
import { fileURLToPath } from "node:url";

// Initialize PocketBase client
const pb = new PocketBase(
  `${process.env.NUXT_PUBLIC_POCKETBASE_HOST}` ||
    `http://127.0.0.1:${process.env.NUXT_PUBLIC_POCKETBASE_PORT}`
);

// Setup authentication if needed
async function authenticate() {
  try {
    // Use environment variables or stored credentials
    if (
      process.env.NUXT_POCKETBASE_ADMIN_EMAIL &&
      process.env.NUXT_POCKETBASE_ADMIN_PASSWORD
    ) {
      // Authenticate as admin
      // return await pb.admins.authWithPassword(
      //   process.env.NUXT_POCKETBASE_ADMIN_EMAIL,
      //   process.env.NUXT_POCKETBASE_ADMIN_PASSWORD
      // );
      return await pb.admins.authWithPassword(
        process.env.NUXT_POCKETBASE_ADMIN_EMAIL,
        process.env.NUXT_POCKETBASE_ADMIN_PASSWORD
      );
    }
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return false;
  }
}

async function syncCollection(collectionName) {
  try {
    const collection = await pb.collections.getOne(collectionName);

    const fieldMappings = {
      bool: "_this.boolean(true)",
      text: '_this.string("")',
      number: "_this.number(0)",
      datetime: '_this.string("")',
      date: '_this.string("")',
      relation: "_this.attr([])",
      editor: '_this.string("")',
      file: '_this.file("", "FIELD_NAME", MULTIPLE)',
      json: "_this.attr({})",
      select: "_this.attr([])",
    };

    const fieldContent = collection.fields
      .filter((field) => !["id", "created", "updated"].includes(field.name))
      .map((field) => {
        let fieldMapping = fieldMappings[field.type];
        if (field.type === "file") {
          const multiple = field?.maxSelect > 1;

          fieldMapping = fieldMappings[field.type]
            .replace("FIELD_NAME", field.name)
            .replace("MULTIPLE", multiple.toString());
        }
        return `    ${field.name}: ${fieldMapping || "this.attr(null)"}`;
      });

    fieldContent.unshift("    id: _this.uid()");
    fieldContent.push('    created: _this.string("")');
    fieldContent.push('    updated: _this.string("")');

    const fileContent = `export default (_this) => {\n  return {\n${fieldContent.join(
      ",\n"
    )}\n  }\n}\n`;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const fieldsFilename = collectionName.endsWith("s")
      ? collectionName.slice(0, -1)
      : collectionName;

    // write fields file
    const filePath = path.join(
      __dirname,
      `../../../models/fields/${fieldsFilename}.js`
    );
    // make sure path exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFileSync(filePath, fileContent);

    // convert collection_name to CollectionName
    let className = collectionName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    // className must be plural
    if (className.endsWith("s")) {
      className = className.slice(0, -1);
    }

    // write model file
    const modelPath = path.join(__dirname, `../../../models/${className}.js`);
    fs.writeFileSync(
      modelPath,
      `import BaseModel from "@/nuxt-base/_app/models/BaseModel";
import fields from "@/models/fields/${fieldsFilename}.js";

export default class ${className} extends BaseModel {
  static entity = "${collectionName}";

  static fields() {
    return {
      ...fields(this),
    };
  }
}
`
    );

    console.log("");
    console.table([{ Schema: fieldsFilename, Saved: filePath }]);
    console.table([{ Model: className, Saved: modelPath }]);
  } catch (error) {
    console.error("Error fetching collection schema:", error);
  }
}

export async function syncPocketBaseCollection(collection) {
  if (!collection) {
    console.error("No collection specified!\n");
    return;
  }
  console.log("Syncing Collection:", collection);
  if (await authenticate()) {
    try {
      await syncCollection(collection);
      console.info("Done!");
    } catch (error) {
      console.error(chalk.red("Error syncing a collection: "), error.message);
    }
  }
}
