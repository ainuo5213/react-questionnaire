### configure eslint

- install dependency

```shell
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

- configure eslint with react

```shell
npx eslint --init
```

- add lint script to package.json

```json
{
  "script": {
    ...,
    "lint": "eslint 'src/**/*.+(js|ts|jsx|tsx)'"
  }
}
```

- install vscode extension
add extension `eslint` to vsocde

### configure prettier

- install dependency

```shell
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

- vscode setting

create `.vscode` directory on `root` path of project

```
——｜ .vscode
—————— settings.json
——｜ src
——｜ package.json
```

write settings.json with code below:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

- install vscode extension

add extension `prettier` to vscode

- customize prettier

create `.prettierrc.js` to `root` path of project

write code of below:

```javascript

module.exports = {
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "none",
    "parser": "typescript",
    "printWidth": 100,
    "endOfLine": "lf",
    "arrowParens": "avoid",
    "bracketSpacing": true
}
```

- add format script to package.json

```json
{
  "script": {
    ...,
    "format": "prettier --write 'src/**/*.+(js|ts|jsx|tsx)'"
  }
}
```

**last step: reboot vscode!!!**

### configure husky

- install dependency

```shell
yarn add husky -D
```

- add pre-commit

create `.husky` directory on `root` path of project

```shell
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm run format"
npx husky add .husky/pre-commit "git add ."
```

### configure commit-lint

- install dependency

```
# Install commitlint cli and conventional config
npm install --save-dev @commitlint/{config-conventional,cli}
# For Windows:
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

- add pre hook
``` shell
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

