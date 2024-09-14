//help: \?//
//list databse: \l
//connect to databse: \c database_name//

create table pizur(
    id INT,
    name varchar(50),
    price INT,
    on_sale boolean
);
/d: to view all tables in databse
/d name-of-table: to view it's contents
Alter table table_name Add column column_name data_type;
ALTER table table_name Drop column column_name;
DROP table pizur(table_name);
DROP DATABASE practice;

CREATE TABLE restaurant(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range>=1 and price_range<=5)
);

INSERT INTO restaurant(id, name, location, price_range) values(1, 'kfc', 'usa', 3);
SELECT * FROM restaurant;
select row-name1, row-name2 from table-name;
 INSERT INTO restaurant (price_range) values(19);
 insert into table_name (row-name) values(value)



CREATE Table reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id  BIGINT NOT NULL REFERENCES restaurant(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating>=1 and rating<=5)
);