# Project Goals

## Accessibility

Components within Pronto should be accessible and promote accessible development. Tags should be semantic. Our standard practice is to meet WCAG's Level AA requirements, though meeting AA should not be enforced by the code.

## Built to Change

Code should be written to be changed. In general, favor simple code over configuration through custom properties. JS components should be built to be style and layout agnostic. Prefer native browser functionality like transitions and animations when posisble. Avoid running JS unthrottled, whether through intervals or high volume events like resize.

## Developer Experience

When making decisions, prefer the option that will be easier to for new developers to read and understand. If there is good reason to use a more complicated approach, make sure the approach and its justification are well documented. Don't break with existing conventions – unless there's justification to do so, and document any changes to conventions for your project.
