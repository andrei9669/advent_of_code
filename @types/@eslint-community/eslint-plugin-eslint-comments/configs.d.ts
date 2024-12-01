declare module "@eslint-community/eslint-plugin-eslint-comments/configs" {
  import type { Linter } from "eslint";

  declare const _default: {
    readonly recommended: { readonly rules: Readonly<Linter.RulesRecord> };
  };

  export = _default;
}
