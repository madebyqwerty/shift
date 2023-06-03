# Shift monorepo

## How to use

This project uses [Moonrepo](https://moonrepo.dev) to orchestrate the tasks, so you need to install it first:

```bash
curl -fsSL https://moonrepo.dev/install/moon.sh | bash
```

^[1]: More on https://moonrepo.dev/docs/install

I recommend to read through the docs of moonrepo, but the basics you want to know are:

`moon project <name_of_project>` - Gets information about the project and tasks you can run
`moon run <name_of_project>:<name_of_task>` - Runs specified task
