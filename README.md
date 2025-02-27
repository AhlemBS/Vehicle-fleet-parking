

#    VEHICLE-FLEET-PARKING          


manage where every vehicle is parked


#     REQUIREMENTS                  


To run this project you will need a computer with Node, Typescript and Cucumber installed.
( make sure u have node 18)

# Install

To install the project, you just have to run `npm install` to get all the dependencies

# Running the tests

After installing the dependencies you can run the tests with this command `npm test`.

# Running the server

After installing the dependencies you can run the server with this command `npm run dev`.



#      STEP 1   




#      STEP 2     


# Running the CLI

- make sure the server is running
- Under the file Vehicle-fleet-parking

> `fleet-cli create <userId>` # returns fleetId on the standard output
> `fleet-cli register-vehicle <fleetId> <vehiclePlateNumber>` # to regiter a vehicle in a fleet
> `fleet-cli park-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]` # to park a vehicle
> `fleet-cli localize-vehicle  <vehiclePlateNumber> lat lng [alt]` # return localisation of a vehicle

# TROUBLESHOOTING Step 2

# if you are facing issue running with fleet-cli

nvm use 18
or
just run it from your package.json : npm run fleet-cli <arguments>

# if you are facing dependencies issue

npm install --legacy-peer-deps

# if you are facing issue with db or prismaClient try

`npx prisma migrate reset`
`npx prisma migrate generate`
`npx prisma migrate dev --name init`

this will regenerate the primsa client and run the migration again


#      STEP 3     


# For code quality i used

# in my local development 

- ESLint to catch errors and enforce coding standards ad it helps the team keeping the same standards 
- Prettier to ensure consistent code formatting  ad it helps the team keeping the same coding standards  
- Husky to be run before each commit / push makig sure eslint and prettier and I made our job 
- Jest to write unit test (in this project I didnt run all )
- 

# in my CI/CD

I used Github actions CI/CD 

 first I added .Yaml File  with the steps instal node packages , lint , format , test 
 thenn i add sonar qube step after the test step and just before the deploy step

 then I neeeded to set my DATABASE_URL as environment variable 

After that it comes the code review step through the pull request , and this is a continious process, that enhance also the quality of the code 



