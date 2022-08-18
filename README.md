# Hasura Action Transforms

## Overview

Hasura REST Connectors allow you to add different transforms to the default HTTP
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

Please ensure the desired types are defined for your action in the UI of your
project before proceeeding to the first step if you would rather not create them
by editing metadata.

**Step 1**: In your project, navigate to the setttings page
<http://{YOUR_PROJECTS_URL}/console/settings/metadata-actions> and export your
projects metadata.

![hasura project settings page](./static-images/add_response_step_1.png?raw=true)

**Step 2**: Open the metadata.json file exported and find the metadata
definition of the action you want to add a response transfrom to. It should have
a smiliar form to what you see below.

![hasura project json metadata action](./static-images/add_response_step_2.png?raw=true)

**Step 3**: Augment the action metadata by adding a response transform object in
the `"definition":{...}` of the action. Please ensure the added response
transform object has the same form as the following:

`"response_transform": { "body": { "action": "transform", "template": "{ }", "version": 2, "template_engine": "Kriti" }`

**Step 4**: Create your json transform using Kriti and insert it into the
response_transform.body.template object created in the last step.

`"response_transform": { "body": { "action": "transform", "template": "{ADDED_KRITI_TRANSFORM}", "version": 2, "template_engine": "Kriti" }`

The action defined in metadata should now look similar to below. Please ensure
the correct output type for the action has been input in
"defintion"."output_type:" as well:

![hasura project metadata with added transform](./static-images/add_response_step_4.png?raw=true)

**Step 5** if you did not create your type defintions when creating the action,
you can add types in the metadata.sources.custom_types object. Note there are
two different types specified in metadata: Input & Standard. Ensure that your
respective types are added to the correct specification in either
`{custom_types.input_objects.[...]}` or `{custom_types.objects.[...]}` of the
metadata file.

![hasura project metadata type definition](./static-images/add_response_step_5.png?raw=true)

## Response Transform Examples

### Example 1

You can review the initial api response at:

<http://localhost:3005/response-example-one>

Initial action response:

`{ "first_name": "Melvin", "last_name": "Shanahan"}`

Kriti transform inserted in template field:

`{ \"data\": {{ concat([{{$body.first_name}},\" \", {{$body.last_name}}]) }} }`

Action Output: `{"full_name": "Melvin Shanahan"}`

### Example 2

You can review the initial api response at:

<http://localhost:3005/response-example-two>

Initial action response:

`{ "name": "Freddie Jones", "age": 27, "author": { "articles": [ { "id": 0, "title": "The Elements","length": 150, "published": true }, { "id": 1, "title": "ARRL Handbook", "length": 1000, "published": true }, { "id": 2, "title": "The Mars Trilogy", "length": 500, "published": false } ] } }`

Kriti transform inserted in template field:

`"{ \"author\": { \"name\": {{$body.name}}, \"age\": {{$body.age}}, \"articles\": [ {{ range _, x := $body.author.articles }} { \"id\": {{x.id}}, \"title\": {{x.title}} } {{ end }} ] } }"`

Action Output:

`"resTransformExTwo": { "author": { "age": 27, "articles": [ [ { "title": "The Elements", "id": 0 }, { "title": "ARRL Handbook", "id": 1 }, { "title": "The Mars Trilogy", "id": 2 } ] ], "name": "Freddie Jones" } }`

### Example 3

You can review the initial api response at:

<http://localhost:3005/response-example-three>

Initial action response which generates random dates as keys:

`[{"1/8/2019":false},{"2/4/2020":true}]`

Kriti transform inserted in template field:

`"template": "{\"calendar\": [ {{range y, x := $body}} {\"date\": {{ head(head(toPairs(x))) }}, \"onSale\": {{ head(tail(head(inverse(toPairs(x))))) }} } {{ end }} ] }"`

Action Output:

`"resTransformExThree": { "calendar": [ [ { "date": "5/17/2017", "onSale": false }, { "date": "6/29/2015", "onSale": false } ] ] }`

## Request Transforms

Request Transforms are enabled through the UI and therefore editing metadata is
not required.

Please see the following documentation which describe the different ways you can
transform requests in Hasura:

<https://hasura.io/docs/latest/actions/rest-connectors/>
