# firedeploy
A handy script to deploy firebase functions


Usage
----
```
firebase deploy --only functions:user_create,functions:user_query,functions:user_update,functions:user_delete
```
to
```
firedeploy user.ts
```

It automatically finds out all exported functions from the script and executes deploy command.
