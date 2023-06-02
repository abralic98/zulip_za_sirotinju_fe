import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/api/graphql",
  documents: "features/**/*.graphql",
  generates: {
    "gql/": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query"
      ],
    },
  },
};

export default config;
