## MongoDB with Spring Boot vs nodejs vs dotnet core

This is a PoC done to comapre spring Boot, nodejs and dotnet core with mongo db.

#### Test

Will have a mongo db with database named 'CandidatesDB' and a collection of 10,000 candidates. Each of these application will have an api 'http://localhost:*port*/api/v1/candidates to retrieve all candidates.

Application port are preconfigured 

    Sprint boot   - 3000
    nodejs        - 4000
    dot.net core  - 5000

#### Result

| Technology    | try #1   |  try #2   | try #3   | try #4   | try #5   | Avg       |
| ------------- |----------| ----------|----------|----------|----------|-----------|
| Spring boot   | 2848 ms  |  1951 ms  | 2132 ms  | 1718 ms  | 1418 ms  | 2013.4 ms |
| nodejs        | 2214 ms  |  1695 ms  | 1749 ms  | 1703 ms  | 1721 ms  | 1816.4 ms |
| dotnet core   | 1448 ms  |  2047 ms  | 1844 ms  | 1717 ms  | 1637 ms  | 1738.6 ms |
