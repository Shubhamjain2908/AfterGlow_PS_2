# AfterGlow_PS_2
Limiting the number of rows in a NoSQL database: 

Problem:-  Retrieve 5 latest data from the database, while keeping the limit of 30 on the number of rows
 - Latest data is always added at the bottom.
 - Once, the database reaches a count of 30, remove the first 5 data points from the database and continue accordingly.
 - The problem is, while retrieval and deletion:-
    - While retrieving you should know the id of the latest 5 records that are at the bottom.
    - While deleting you should know the id of the first 5 records that are at the top.

# Installation
 Prerequisites:

 - NodeJs (npm) 
 - MongoDB
	 Install Node.js and npm
		Download the latest version of Node.js if you do not already have it installed on your machine. This download will also include the latest version of npm.

		https://nodejs.org/en/download/

	Install Libraries and Dependencies
		Once you have the files downloaded, navigate into the root project directory and run the following command. This will install all libraries and dependencies.

		npm install
		
Make sure to update MongoDB credientials (database: 'ag', collection: 'customers')

# Run as
 - npm start (port: 3000)

