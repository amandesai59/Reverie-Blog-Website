import { MongoClient } from "mongodb";

export class MongoDBClient {
  uri: string;
  client: MongoClient;
  database: string;

  constructor() {
    this.uri =
      "mongodb+srv://khushi:XwZlWgc68IbjmkQW@cluster0.jmtbywo.mongodb.net/?retryWrites=true&w=majority";
    this.client = new MongoClient(this.uri);
    this.database = "BLOG";
  }

  // post item
  async postItem(item, table) {
    this.client.connect();

    // Access the database and collection
    const collection = this.client.db(this.database).collection(table);

    try {
      let response = await collection.insertOne(item);
      return response;
    } catch (error: unknown) {
      let message = "Failed to post item";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async getItem(item, table) {
    this.client.connect();

    const collection = this.client.db(this.database).collection(table);

    try {
      let response = await collection.findOne(item);
      if (response == null) {
        throw new Error("Item does not exist");
      }
      return response;
    } catch (error: unknown) {
      let message = "Failed to get item";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  //delete item
  async deleteitem(item, table) {
    this.client.connect();

    const collection = this.client.db(this.database).collection(table);

    try {
      let response = await collection.deleteOne(item);
      if (response.deletedCount == 0) {
        throw new Error("Item does not exist");
      }
      return response;
    } catch (error: unknown) {
      let message = "Failed to delete item";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  //update item
  async updateitem(item, table, updatedItem) {
    this.client.connect();

    const collection = this.client.db(this.database).collection(table);

    try {
      let response = await collection.updateOne(item, { $set: updatedItem });

      if (response.matchedCount == 0) {
        throw new Error("Item does not exist");
      }

      return response;
    } catch (error: unknown) {
      let message = "Failed to update item";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  //get all items
  async getallitem(table) {
    this.client.connect();

    const collection = this.client.db(this.database).collection(table);

    try {
      let response = await collection.find().toArray();
      if (response == null) {
        throw new Error("No items exist");
      }
      return response;
    } catch (error: unknown) {
      let message = "Failed to get items";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async getItems(item, table) {
    this.client.connect();

    const collection = this.client.db(this.database).collection(table);

    try {
      let response = await collection.find(item).toArray();
      if (response == null) {
        throw new Error("Item does not exist");
      }
      return response;
    }
    catch (error: unknown) {
      let message = "Failed to get item";
      if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }
}
