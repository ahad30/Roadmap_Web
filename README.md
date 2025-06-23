Feature Design

In developing this roadmap app, my primary focus was on enhancing usability and ensuring smooth interaction flows. For the comment system, I aimed to facilitate open discussions while preventing excessive nesting. Therefore, I decided to limit replies to a maximum of three levels. Users can delete top-level comments along with their corresponding replies, whereas replies also  be deleted individually—which maintains the context of conversations while giving users control.

Upvoting functionality was introduced to allow users to express support for the roadmap items they find important. Each user is permitted to vote only once per item.A user can also filter the roadmap by cateogry and status and also can sort it by its upvotes popularity


Architecture Choices

I choose React on the frontend due to its component-based architecture, which facilitated the  features such as filters, comment trees, and roadmap cards into manageable modules. On the backend, Express with Prisma (MongoDB) provided the flexibility and a  ORM interface necessary for handling nested data.

Selecting Prisma over traditional Mongo queries contributed to better maintainability and reduced the likelihood of errors, especially when managing relationships among users, comments, and upvotes.



Code Style

I used camelCase for variables and PascalCase for components. The code is organized to distinctly separate logic (controllers), routes and schema in backend and in frontend i used components based architecture for better folder structure and code readability.    The API complies with RESTful design principles.

In summary, I emphasized clean code, straightforward interactions, and choices that promote scalability while avoiding unnecessary complexity.

Create a `.env` file in the backend directory:

```env
DATABASE_URL="mongodb+srv://username:password@cluster0.qxclpw1.mongodb.net/databasename?retryWrites=true&w=majority"
JWT_SECRET=your_Token_secret_key
JWT_EXPIRES_IN="30m"(optinal)
PORT=5000
```

Create a `.env` file in the Frontend directory:
VITE_BACKEND_URL=http://localhost:5000/api/v1

