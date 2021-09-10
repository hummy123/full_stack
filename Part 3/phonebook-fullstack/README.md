# Phonebook full-stack

## Link to online application

https://arcane-reaches-66730.herokuapp.com/

## Repository structure

The "frontend" folder contains the React app for the phonebook.
The "backend" folder contains the Node server. 
The folder "arcane-reaches-66730" contains the Git repository deployed to Heroku.

## Relevant scripts

- npm run copyfront
   - generates a production build of the front-end and copies it to arcane-reaches-66730
- npm run copyback 
  - copies the back-end to arcane-reaches-66730

- MSG="commit message here" npm run deploy
   - adds untracked files to Git, commits with MSG and deploys to Heroku.
     - MSG does not support spaces in the commit message.

- MSG="commit message here" npm run deployfull
  - executes all the above in the listed order.
      - MSG does not support spaces in the commit message.
