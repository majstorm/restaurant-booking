# API endpoints

These endpoints allow you to handle Stripe subscriptions for Publish and Analyze.

## GET
[/restaurant](#get-restaurant) <br/>
[/restaurant/:name](#get-restaurantname) <br/>
[/restaurant/:name/tables](#get-restaurantname-tables) <br/>

## POST
[/restaurant](#post-restaurant) <br/>
[/restaurant/:name/add-table](#post-restaurantname-add-table) <br/>
[/restaurant/:name/reserve-table](#post-restaurantname-reserve-table) <br/>
[/restaurant/:name/cancel-reservation](#post-restaurantname-cancel-reservation) <br/>

## PUT
[/restaurant/:name/reserve-table](#put-restaurantname-reserve-table) <br/>
[/restaurant/:name/working-hours](#put-restaurantname-working-hours) <br/>
___

### GET /restaurant
Get list of restaurants where you can book a table 

**Response**

```
// No Restaurants available
{}

or

// Restaurants available for booking
[
    {
        "_id": "622f562f1a431974043de363",
        "Name": "IamSuperb",
        "Email": "test@tester.com",
        "CompanyName": "SuperbCompany",
        "__v": 0,
        "CloseHour": 15,
        "OpenHour": 13
    }
]
```

___

### GET /restaurant/:name
Get list of reservations for the specific restaurant 

**Response**

```
// No reservations at the given restaurant available
{}

or

// Restaurants available for booking
[
    {
        "_id": "6232402a0e8d2a9a469a94b6",
        "DateTime": "2022-05-03T13:00:00.000Z",
        "TableId": "6230cec0a235965ccf496211",
        "ReservationName": "SuperbReservation",
        "GuestNumber": 4,
        "createdAt": "2022-03-16T19:53:14.029Z",
        "updatedAt": "2022-03-16T20:10:56.432Z",
        "__v": 0
    }
]
```

___

### GET /restaurant/:name/tables
Get list of tables in the restaurant

**Response**

```
// No tables available
{}

or

// Tables available 
[
    {
        "_id": "6230b04ac82db58278f25734",
        "Id": 1,
        "NumberOfPlaces": 2,
        "Type": "Standard",
        "Description": "Table by the window, a bit crooked",
        "RestaurantId": "622f562f1a431974043de363",
        "createdAt": "2022-03-15T15:27:06.417Z",
        "updatedAt": "2022-03-15T15:27:06.417Z",
        "__v": 0
    },
]
```
___

### POST /restaurant
Add new Restaurant 

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `Name` | required | string  | The name of the restaurant                                                                     |
|     `Email` | optional | string  | Main email of the restaurant ath the given location                                                                     |
|     `CompanyName` | required | string  | The organization behind the restaurant                                                                     |
|     `OpenHour` | required | Number  | When does the restaurant open                                                                     |
|     `CloseHour` | required | Number  | When does the restaurant close                                                                     |

**Response**

```
// Invalid input
{
    "msg": "Error: Error creating restaurant"
}

or

// Restaurants created successfully
[
    {
        "_id": "622f562f1a431974043de363",
        "Name": "IamSuperb",
        "Email": "test@tester.com",
        "CompanyName": "SuperbCompany",
        "__v": 0,
        "CloseHour": 15,
        "OpenHour": 13
    }
]
```

___

### POST /restaurant/:name/add-table
Add new table in the specified restaurant

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `Id` | required | Number  | Table Id                                                                     |
|     `NumberOfPlaces` | optional | Number  | Maximum number of seats at the table                                                                     |
|     `Type` | optional | string  | Type of table                                                                      |
|     `Description` | optional | string  | Details regarding table at hand                                                                     |


**Response**

```
// Incorrect input or duplicate table id
{
    "msg": "Error: Table not created"
}

or

// Table added
{
    "msg": "Table created"
}
```

___

___

### POST /restaurant/:name/reserve-table
Add new table in the specified restaurant

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `Date` | required | Number  | Date in format YYYY-MM-DD                                                                     |
|     `Hour` | required | Number  | 0-23 range                                                                      |
|     `ReservationName` | required | string  | On which name to leave the reservation                                                                      |
|     `GuestNumber` | required | string  | How many seats are needed                                                                     |


**Response**

```
// Incorrect input
{
    "msg": "Error: Error creating restaurant"
}

or

// Reservation added
{
    "msg": "Reservation created"
}

or

// No available tables at the restaurant
{
    "msg": "No available tables"
}
```

___

### POST /restaurant/:name/cancel-reservation
Cancel the reservation

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `Date` | required | Number  | Date in format YYYY-MM-DD                                                                     |
|     `Hour` | required | Number  | 0-23 range                                                                      |
|     `ReservationName` | required | string  | On which name to leave the reservation                                                                      |
|     `GuestNumber` | required | string  | How many seats are needed                                                                     |


**Response**

```
// Incorrect input or nothing to remove
{
    "msg": "Error: Reservation not removed"
}

or

// Reservation cancelled
{
    "msg": "Reservation cancelled"
}
```

___

### PUT /restaurant/:name/reserve-table
Modify the reservation 

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `_id` | required | Number  | Reservation id                                                                    |
|     `Date` | required | Number  | Date in format YYYY-MM-DD                                                                     |
|     `Hour` | required | Number  | 0-23 range                                                                      |
|     `ReservationName` | required | string  | On which name to leave the reservation                                                                      |
|     `GuestNumber` | required | string  | How many seats are needed                                                                     |

**Response**

```
// No Reservation to update
{
    "msg": "Error: No reservation to update"
}

or

// Reservation updated
{
    "msg": "Reservation updated"
}
```

### PUT /restaurant/:name/working-hours
Change restaurant working hours

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                         |
| -------------:|:--------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `OpenHour` | optional | Number  | Opening hours of the restaurant                                                                   |
|    `CloseHour` | optional | Number  | Closing hours of the restaurant          |

**Response**

```

Successfull change or no change

{
    "_id": "622f562f1a431974043de363",
    "Name": "IamSuperb",
    "Email": "test@tester.com",
    "CompanyName": "SuperbCompany",
    "__v": 0,
    "CloseHour": 18,
    "OpenHour": 5
}
```
