# AfterGlow_PS_2
Limiting the number of rows in a NoSQL database: 

Problem:-  Retrieve 5 latest data from the database, while keeping the limit of 30 on the number of rows
 - Latest data is always added at the bottom.
 - Once, the database reaches a count of 30, remove the first 5 data points from the database and continue accordingly.
 - The problem is, while retrieval and deletion:-
    - While retrieving you should know the id of the latest 5 records that are at the bottom.
    - While deleting you should know the id of the first 5 records that are at the top.

