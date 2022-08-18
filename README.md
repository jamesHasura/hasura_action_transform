# Hasura Rest Connector Transforms

## Overview

REST Connectors allow you to add different transforms to the default HTTP
request. You can also use context variables in the transforms to achieve dynamic
behavior for each request.

The starter kit can be broken into two parts:

- Response Transforms
- Request Transforms

## Project Setup

- `cd into the main project directory`
- `docker-compose up -d`
- `cd ./data-api`
- `npm install`
- `npm start`
- `navigate in your browser to:`<http://localhost:8080/console/settings/metadata-actions>
- `import the hasura_sample_metadata.json file from the root of the example directory`

## Response Transforms

The response transform examples showcase how kriti (json templating language)
and hasura metadata can be used to transform action responses. Currently, hasura
only supports the ability to transform action responses through a projects
metadata.json export file. Look through the hasura_sample_metadata.json file to
see three action transform examples labeled:

- resTransformExOne
- resTransformExTwo
- resTransformExThree

For information on Kriti please see the following link:
`<https://github.com/hasura/kriti-lang>`

### Adding a response transform

Step 1: In your project, navigate to the setttings page
<http://{YOUR_PROJECTS_URL}/console/settings/metadata-actions> and export your
projects metadata.

![hasura project settings page](./static-images/add_response_step_1.png?raw=true)

Step 2: Open the metadata.json file exported and find the metadata definition of
the action you want to add a response transfrom to. It should have a smiliar
form to what you see below.

![hasura project json metadata action](./static-images/add_response_step_2.png?raw=true)

Step 3: Augment the action metadata by adding a response transform object in the
`"definition":{...}` of the action. Please ensure the added response transform
object has the same form as the following:

`"response_transform": { "body": { "action": "transform", "template": "{ }", "version": 2, "template_engine": "Kriti" }`

Step 4: Create your json transform using Kriti and insert it into the
response_transform.body.template object created in the last step.

`"response_transform": { "body": { "action": "transform", "template": "{ADDED_KRITI_TRANSFORM}", "version": 2, "template_engine": "Kriti" }`

The action defined in metadata should now look similar to below:

![hasura project metada with added transform](./static-images/add_response_step_4.png?raw=true)
