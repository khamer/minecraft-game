# Overview
##### Pronto is Imarc's front-end framework for websites and web applications.

It is open source, opinionated, and is built to be changed over configured, with an emphasis on the code being simple to read, maintain, and adapt to individual project needs.

Pronto uses [Vite](https://vite.dev/) and [Vitrine](https://github.com/imarc/vitrine) to provide this library of its components, that becomes part of your project. See [Pronto's own site](https://imarc-pronto.netlify.app/components/) to see the latest components.


## Organization

Pronto's components are organized following [Atomic Design](https://atomicdesign.bradfrost.com/):

* **Atoms** are the smallest components, and should not contain any other components. *Examples: buttons, inputs, tags, headings.*
* **Molecules** are the next smallest, and should only depend on atoms. *Examples: banners, accordions, lists, pagination.*
* **Organisms** can depend on both atoms and molecules. These often represent a full slice across the page. *Examples: hero, section, site header, site footer.*
* Pronto currently doesn't ship with any **Templates** or **Pages**, but these groups should be created as appropriate.
* **Utilities** are components that are meant to be used with other components and primarily provide functionality.
* **Imported** components are not copied into your project by default. They are meant to be consistent across projects.

Every visual component should have its folder. Vue components, composables and directives have folders within resources/js/. The folder name for a component should match the blockName, in lowerCamelCase, as should the naming of example HTML files.


### Naming Conventions

Pronto uses SCSS for all styles, and uses ABEM for class naming:

```
.blockName.-blockModifier
.blockName__elementName
.blockName__elementName.-elementModifier
.-modifierName.-modifierName-modifierValue
```

#### Custom Properties

Custom property names should use the following naming convention:
```
--prefix-property-name-suffix
```

* Root level custom properties are prefixed with `--root-` and are not meant to overridden by components.
* Properties that are meant to be overridden should be unprefixed (like `--accent-color`, `--gap`, `--size`)
* Private, component specific properties should be prefixed with the component name in kebab-case (`--cell-span`)

#### Vue files

```
vDirectiveName.js
PComponentName.vue
useComposableName.js
```

* Vue directive files should be named in UpperCamelCase and prefixed with 'v'. *Example: vDirectionals.js.*
* Pronto's Vue components should be prefixed with P and follow Vue naming conventions. Other components do not need to use the P prefix. *Example: PAccordion.vue.*
* Vue composables only need to follow Vue naming conventions.

## Goals

### Accessibility

Components within Pronto should be accessible and promote accessible development. Tags should be semantic.

### Built to Change

CSS should be built primarily to be changed. In general, favor simple code over configuration through custom properties. JS components should be built to be style and layout agnostic, focused on extending and working with builtin browser functionality instead of recreating it. For example, prefer CSS animations, native dialog and popover behaviors. Avoid running JS unthrottled, whether through intervals or high volume events like resize.

### Developer Experience

When making decisions, prefer the option that will be easier to for new developers to read and understand. If there is good reason to use a more complicated approach, make sure the approach and its justification are well documented.
