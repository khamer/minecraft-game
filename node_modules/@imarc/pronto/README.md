# Pronto

Pronto is a package of front-end components built by Imarc. The components in Pronto are built to be changed over configured, with an emphasis on the code being simple to read and adapt to individual project needs.

For documentation, see https://imarc-pronto.netlify.app/components/overview/

## Installation

To install Pronto into your project, you can run:

```
npx @imarc/pronto@latest
```

### Advanced, non-interactive installation

There is a non-interactive way to install pronto that works, but you should expect changes in future versions:

```
npx @imarc/pronto@latest --non-interactive <copy components> <copy path> <add dependency> <create vite.config.js> <copy sprite sheet> <sprite sheet path>
```

Other than `<copy path>` and `<sprite sheet path>`, each argument should be `y` or `n`, and correspond to the interactive prompts.

## Contributing

Pronto is being developed as an open source project and welcomes contributions. Please read through Pronto's goals before contributing. We will be judicious about adding new dependencies to Pronto, however Pronto may leverage Vue, Vite, and Pinia.

### Working on Pronto

The recommended way to work on Pronto is to work within Vitrine after cloning Pronto:

1. Clone Pronto to a folder of your choosing.
2. Within that folder, run `npm install` and `npm run dev`.
3. Make sure to check any functional changes to Vitrine or Pronto also work properly with the build step `npm run prod` as well.
