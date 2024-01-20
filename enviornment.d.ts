declare global {

    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string; // this is the line you want

      }
    }
}

export {}