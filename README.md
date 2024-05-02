# task-manager

## Getting Started
It's a task management application that allows us to create, update, and delete tasks.<br> Tasks should have a title, description, and a status (e.g., "To Do," "In Progress," "Done"). <br>
You can view the list of tasks and filter them by status.<br>
> Note: It uses React to handle UI & general routes & ROR for APIs.

### Prerequisites

Make sure you have the following installed on your local machine:

- Ruby (version >= 3.1.2)
- Rails (version >= 7.0.8.1)
- PostgreSQL
- Node, npm, yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mitali-gaur/task-manager.git
    ```

2. Bundle gems:

    ```bash
    bundle install
    ```

3. Install packages:

    ```bash
    npm install
    ```

4. Precompile assets:

    ```bash
    rails assets:precompile
    ```

5. Setup database:

    ```bash
    rails db:create db:migrate db:seed
    ```

6. Start server:

    ```bash
    rails server
    ```
