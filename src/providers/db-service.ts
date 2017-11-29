import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLiteObject, SQLite} from "@ionic-native/sqlite";
/*
  Generated class for the DbServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DbService {
  public  db: SQLiteObject = null;
  public readonly favoriteTable : string = "Favorite" ;
  public readonly cartTable : string = "Cart" ;
  constructor( public sqlite : SQLite ) {
    console.log('Hello DbServiceProvider Provider');
  }
  openOrCreateSQLiteDB() : Promise <any>{
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((dbObj: SQLiteObject) => {
      this.db = dbObj ;
    }).catch(e => console.log(e));
  }
  // favorite stuff
  createFavoriteTable() : Promise <any>
  {
    return this.db.executeSql(`CREATE TABLE Favorite(
                              FavoritID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
                              UserID    INTEGER NOT NULL,
                              SellerID INTEGER DEFAULT 0 ,
                              TokenID   TEXT    DEFAULT NULL,
                              ProductID INTEGER NOT NULL ,
                              product_name TEXT NOT NULL ,
                              Rate INTEGER NOT NULL ,
                              Image TEXT NOT NULL ,
                              ProductPrice FLOAT NOT NULL
                            )`, {});

  }
  checkIfTableExist(table_name : string) : Promise<any>
  {
    return this.db.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table_name}'` , {});
  }
  execFavLocalInsertion(UserID : number, TokenID: string , ProductID : number, ProductName : string, Rate : number, Image: string , ProductPrice : number): Promise<any>
  {
    return this.db.executeSql(`INSERT INTO Favorite (UserID,TokenID,ProductID,product_name,Rate,Image,ProductPrice)
                        VALUES (${UserID}, '${TokenID}', ${ProductID}, '${ProductName}',${Rate},'${Image}',${ProductPrice})`,{});
  }
  execFavLocalGet() : Promise<any>
  {
    return this.db.executeSql(`SELECT * FROM Favorite` , {});
  }
  execFavLocalDel() : Promise<any>
  {
    return this.db.executeSql(`DELETE FROM Favorite` , {});
  }
  execFavLocalDelByID(FavoritID : number) : Promise<any>
  {
    return this.db.executeSql(`DELETE FROM Favorite WHERE FavoritID = '${FavoritID}'`, {});
  }
  execFavLocalDelByProductID(ProductID : number) : Promise<any>
  {
    return this.db.executeSql(`DELETE FROM Favorite WHERE ProductID = '${ProductID}'`, {});
  }
  // cart stuff
  createCartTable() : Promise <any>
  {
    return this.db.executeSql(`CREATE TABLE Cart(
                              CartID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,
                              UserID    INTEGER NOT NULL,
                              SellerID    INTEGER NOT NULL,
                              TokenID   TEXT    DEFAULT NULL,
                              ProductID INTEGER NOT NULL ,
                              QTY INTEGER DEFAULT 1,
                              Shiping FLOAT DEFAULT 0 ,
                              product_name TEXT NOT NULL ,
                              Image TEXT NOT NULL ,
                              ProductPrice FLOAT NOT NULL
                            )`, {});
  }
  execCartLocalInsertion(UserID : number, TokenID: string , ProductID : number, SellerID : number ,ProductName : string, Image: string , ProductPrice : number): Promise<any>
  {
    return this.db.executeSql(`INSERT INTO Cart (UserID,TokenID,ProductID,SellerID,product_name,Image,ProductPrice)
                        VALUES (${UserID}, '${TokenID}', ${ProductID}, ${SellerID} ,'${ProductName}','${Image}',${ProductPrice})`,{});
  }
  execCartLocalGet() : Promise<any>
  {
    return this.db.executeSql(`SELECT * FROM Cart` , {});
  }
  execCartLocalDel() : Promise<any>
  {
    return this.db.executeSql(`DELETE FROM Cart` , {});
  }
  execCartLocalDelByID(CartID : number) : Promise<any>
  {
    return this.db.executeSql(`DELETE FROM Cart WHERE CartID = '${CartID}'`, {});
  }
  execCartLocalDelByProductID(ProductID : number) : Promise<any>
  {
    return this.db.executeSql(`DELETE FROM Cart WHERE ProductID = '${ProductID}'`, {});
  }
  sqliteResToArr(res : any) : any []
  {
    let array :any[] = [];
    for(let i = 0 ; i < res.rows.length ; i++)
    {
      array.push(res.rows.item(i));
    }
    return array ;
  }
}
