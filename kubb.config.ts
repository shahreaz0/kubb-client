import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";

function camelToKebab(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export default defineConfig({
  input: {
    path: "https://api.alhira.org/doc",
  },
  output: {
    path: "./gen",
    clean: true,
    barrelType: false,
  },

  plugins: [
    pluginOas(),
    pluginTs({
      output: {
        path: "./types",
        barrelType: false,
      },
      group: {
        type: "tag",
        name({ group }) {
          return `${group.toLowerCase()}`;
        },
      },
      transformers: {
        name(name, type) {
          if (type === "file") {
            return camelToKebab(name) + "-type";
          }
          return name;
        },
      },
    }),
    pluginReactQuery({
      output: {
        path: "./hooks",
        barrelType: false,
      },
      group: {
        type: "tag",
        name: ({ group }) => `${group.toLocaleLowerCase()}`,
      },
      suspense: false,
      client: {
        dataReturnType: "data",
        importPath: "@/lib/axios",
      },
      mutation: {
        methods: ["post", "put", "delete"],
      },
      // infinite: {
      //   queryParam: "next_page",
      //   initialPageParam: 0,
      //   cursorParam: "nextCursor",
      // },
      // query: {
      //   methods: ["get"],
      //   importPath: "@tanstack/react-query",
      // },

      transformers: {
        name(name, type) {
          if (type === "file") {
            return camelToKebab(name);
          }
          return name;
        },
      },
    }),
  ],
});
