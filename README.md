# 🤖 PerfiGit

Web application focused on generating GitHub README profiles using AI.

## 🛠️ Requirements

- [Nodejs v22.3.0](https://nodejs.org/en/blog/release/v22.3.0)

## 🚀 Getting Started

### Local Development Setup

1. Clone the repository.

   ```bash
   git clone https://github.com/JoelSanti/perfigit.git
   cd perfigit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Copy the content of `.env.example` into `.env` and `.env.local`:

     ```bash
     cp .env.example .env
     cp .env.example .env.local
     ```

   - Fill in the values of the environment variables.

4. Start the development server and navigate to <http://127.0.0.1:3000/> to access the application.

   ```bash
   npm run dev
   ```

5. That's all you need to do.

## 🖥️ Local Development

### Work flow

1. Check an assigned task in Asana.

2. Create a branch.

3. Add commits.

4. Create PR.

5. Add screenshots inside Asana task if there were UI changes.

6. Request review.

### Coding style

- Use English words in the backend and Spanish ones in the frontend user components.

- Keep in mind the following conventions for handling Git and GitHub logs:

  - For writing commits use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). For example:

    ```shell
    feat(master): remove field from model
    ```

  - For naming branches:

    - Use the pattern `<type>/<story ID>-<branch name>`. Where
      - Type: `feat|chore|fix`
      - Story ID: Task’s ID from [Asana](https://app.asana.com/0/1205919244595687/1205919526171646).
      - Branch name: Very short description in snake case.
    - Example:
      - `feat/1207805542088694-initial_project`

  - For naming pull request (PR). As example:

    - Pattern `<type>(<scope>): <message>`. Where:
      - Type: `feat|chore|fix`
      - Scope: Block or scope the changes affect the most.
      - Message: Short description.
    - Example:
      - `chore(master): create required DB tables`

  - For writing PR description.

    - Pattern:

      ```md
      From story [Story ID|Story ID URL](Story ID URL)
      ```

      Where:

      - Story ID: Task’s ID from Asana.
      - Story ID URL: Task’s URL from Asana.

    - Example:
      - `From story [1207805542088694](https://app.asana.com/0/1207805542088681/1207805542088694)`
