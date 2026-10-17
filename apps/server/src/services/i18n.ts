import { LOCALE_IDS, setDayjsLocale } from "@triliumnext/commons";
import { i18n } from "@triliumnext/core";
import i18next from "i18next";
import { join } from "path";

import { getResourceDir } from "./utils";

/**
 * Initialize translations with explicit i18next instance and locale.
 * Used as a TranslationProvider callback for initializeCore().
 */
export async function initializeTranslationsWithParams(i18nextInstance: typeof i18next, locale: LOCALE_IDS) {
    const resourceDir = getResourceDir();
    const Backend = (await import("i18next-fs-backend/cjs")).default;

    // Initialize translations
    await i18nextInstance.use(Backend).init({
        lng: locale,
        fallbackLng: "en",
        ns: "server",
        backend: {
            loadPath: join(resourceDir, "assets/translations/{{lng}}/{{ns}}.json")
        }
    });

    // Initialize dayjs locale.
    await setDayjsLocale(locale);
}


/** Initializes the Node translation backend through core's shared language resolution. */
export async function initializeTranslations() {
    await i18n.initTranslations(initializeTranslationsWithParams);
}
