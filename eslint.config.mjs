// @ts-check
import eslintPkg from "@eslint/js";
import { config, configs as tseslintConfig } from "typescript-eslint";
import { configs as angularConfig, processInlineTemplates } from "angular-eslint";

const { configs: eslintConfig } = eslintPkg;

export default config(
    {
        files: ["**/*.ts"],
        ignores: [
            "src/assets/**/*.ts",
            "src/examples/*.ts"
        ],
        extends: [
            eslintConfig.recommended,
            ...tseslintConfig.recommended,
            ...tseslintConfig.stylistic,
            ...angularConfig.tsRecommended,
        ],
        processor: processInlineTemplates,
        rules: {
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    style: "camelCase",
                },
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    style: "kebab-case"
                },
            ],
            "@angular-eslint/component-class-suffix": [
                "error",
                {
                    suffixes: ["Component", "Page", "Layout"]
                }
            ]
        },
    },
    {
        files: ["**/*.html"],
        extends: [
            ...angularConfig.templateRecommended,
            ...angularConfig.templateAccessibility,
        ],
        rules: {},
    }
);
