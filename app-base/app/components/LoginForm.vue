<template>
  <div class="fill-height d-flex flex-row justify-center align-center gradient">
    <v-card
      v-if="loginImage && imagePosition === 'left'"
      width="50%"
      height="100%"
      class="rounded-0 hidden-sm-and-down"
      flat
      color="transparent"
    >
      <v-img
        :src="loginImage"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="100vh"
        cover
      />
    </v-card>
    <v-card
      max-width="420px"
      min-width="360px"
      class="mx-auto"
      flat
      color="transparent"
    >
      <v-slide-x-transition
        class="py-0"
        _tag="v-input"
        group_
      >
        <!-- <v-card-text
          v-if="allowSignup"
          class="title-text text-uppercase"
        >
          {{ t(isSignUp ? "Signup" : "Login") }}
        </v-card-text> -->
        <v-card-text>
          <v-form
            ref="form"
            @submit.prevent="() => (isSignUp ? signup() : login())"
          >
            <v-text-field
              v-if="config.nuxtBase?.required?.username && isSignUp"
              variant="solo-filled"
              label="Username"
              v-model="username"
              type="text"
              @keyup.enter="signup()"
              :rules="usernameRules"
              required
              class="my-4"
            />
            <v-text-field
              variant="solo-filled"
              type="email"
              label="Email"
              v-model="email"
              @keyup.enter="if (email) passwordField.focus();"
              :rules="emailRules"
              required
              autocomplete="email"
              class="my-4"
            />
            <v-text-field
              ref="passwordField"
              variant="solo-filled"
              label="Password"
              v-model="password"
              type="password"
              @keyup.enter="isSignUp ? signup() : login()"
              :rules="passwordRules"
              required
              class="my-4"
            />
            <v-text-field
              v-if="isSignUp && config.nuxtBase?.required?.passwordConfirm"
              variant="solo-filled"
              label="Confirm Password"
              v-model="passwordConfirm"
              type="password"
              @keyup.enter="signup()"
              :rules="passwordConfirmRules"
              required
              class="my-4"
            />
            <div class="d-flex flex-row justify-center">
              <v-btn
                v-if="isSignUp"
                size="x-large"
                rounded="xl"
                color="secondary"
                variant="flat"
                block
                :loading="loading"
                @click="signup"
                class="login-btn text-none font-weight-bold"
                >Sign Up</v-btn
              >
              <v-btn
                v-else
                size="x-large"
                rounded="xl"
                color="primary"
                variant="flat"
                block
                :loading="loading"
                @click="login"
                class="login-btn text-none font-weight-bold"
                >Login</v-btn
              >
            </div>
            <div
              v-if="allowSignup"
              class="pa-6 d-flex flex-column align-center justify-center"
            >
              <v-divider />
              <span class="text-muted pb-4">or</span>
              <v-btn
                v-if="isSignUp"
                size="large"
                flat
                _block
                variant="text"
                class="px-4"
                @click="isSignUp = false"
                >Login</v-btn
              >
              <v-btn
                v-else
                size="large"
                flat
                _block
                variant="text"
                color="secondary-"
                class="px-4"
                @click="isSignUp = true"
                >Sign Up</v-btn
              >
            </div>
          </v-form>
        </v-card-text>
      </v-slide-x-transition>
    </v-card>
    <v-card
      v-if="loginImage && imagePosition === 'right'"
      width="50%"
      height="100%"
      class="rounded-0 hidden-sm-and-down"
      flat
      color="transparent"
    >
      <v-img
        :src="loginImage"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="100vh"
        cover
      />
    </v-card>
    <v-snackbar
      v-model="snackbar"
      top
      right
      tile
      color="red accent-2"
    >
      {{ errorText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>

const props = defineProps({
  loginImage: {
    type: String,
    default: null,
  },
  imagePosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  collection: {
    type: String,
    default: "users",
  },
});

const pb = usePocketBase();
const config = useAppConfig();

const snackbar = ref(false);
const errorText = ref("");
const isSignUp = ref(false);
const loading = ref(false);
const passwordField = ref(null);

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const form = ref(null);

const usernameRules = [(v) => !!v || "Username is required"];
const emailRules = [(v) => !!v || "Email is required"];
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
];
const passwordConfirmRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v === password.value) || "Passwords must match",
];

const allowSignup = computed(() => config?.nuxtBase?.signup || false);

const showError = (error) => {
  snackbar.value = true;
  errorText.value = error;
};

async function login() {
  const { valid } = await form.value.validate();

  if (!valid) {
    return false;
  }
  try {
    loading.value = true;

    const collection = props.collection === "admin" ? "_superusers" : props.collection;
    await pb.collection(collection).authWithPassword(email.value, password.value);

    let authRedirect = localStorage.getItem("authRedirect");
    if (authRedirect) {
      localStorage.removeItem("authRedirect");
      navigateTo(authRedirect);
    } else {
      navigateTo(config?.nuxtBase?.afterLoginURL || "/");
    }
  } catch (error) {
    loading.value = false;
    showError(error);
    console.log(error);
  }
}

async function signup() {
  if (!config.nuxtBase?.required?.passwordConfirm) {
    passwordConfirm.value = password.value;
  }
  const { valid } = await form.value.validate();

  if (!valid) {
    return false;
  }
  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
    emailVisibility: false,
  };
  try {
    loading.value = true;
    await pb.collection(props.collection).create(data);
    await pb
      .collection(props.collection)
      .authWithPassword(email.value, password.value);
    navigateTo(config?.nuxtBase?.afterSignupURL || "/");

    //   showError("Signup Error! Contact support.");
  } catch (error) {
    showError("Signup failed. Please contact support.");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  const authRedirect = localStorage.getItem("authRedirect");
  if (pb.authStore.isValid && authRedirect) {
    localStorage.removeItem("authRedirect");
    navigateTo(authRedirect);
  } else if (pb.authStore.isValid) {
    navigateTo(config?.nuxtBase?.admin?.url || "/");
  }
});
</script>

<style>
.gradient {
  background-image: linear-gradient(
    rgba(201, 201, 201, 0.09),
    rgba(0, 0, 0, 0.077)
  );
  background-repeat: no-repeat;
}
#__nuxt {
  height: 100vh !important;
}
.login-btn {
  letter-spacing: 0.5px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
