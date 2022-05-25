#Simple document storage using nestjs and prisma

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API Reference

#### Upload File

```http
  POST /documents/upload
```

Attch the file you want to upload
It should be in one of these formats [jpg|png|docs|docx|doc|pdf|xlsx]

```
{
  "success": "File Uploaded Successfully",
  "data": {
    "id": 4,
    "filename": "abc.png",
    "path": "uploadedFiles/c8a73f697bcfbb5048ddd41f4b2018d9",
    "mimetype": "image/png",
    "reference": "28v2",
    "created_at": "2022-04-20T10:53:38.253Z",
    "updated_at": "2022-04-20T10:53:38.255Z"
  }
}
```

#### Retrieve File

```http
  GET /documents/:reference
```

| Parameter   | Type     | Description                                          |
| :---------- | :------- | :--------------------------------------------------- |
| `reference` | `string` | **Required**. REFERENCE of the file to be downloaded |
