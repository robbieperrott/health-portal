# Solution

I created a [next.js](https://nextjs.org/) app and made use of [shadcn](https://ui.shadcn.com/) components and [D3](https://d3js.org/) charts.

## Authentication

I used a very simple [Firebase](https://firebase.google.com/) auth that allows a user to sign in / up with their Google account.

The app is wrapped in an <code>AuthProvider</code> that uses an <code>AuthContext</code> to sign the user in and out. The first 10 characters of the User ID Token are logged to the console here whenever the user changes.

I used [route groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) to manage user access to routes.

The (protected) route group's layout is wrapped in an AuthGuard component. This component redirects users to "/" if they are not signed in, where they will then see the "Sign in" prompt. There is a "Checking session" loading state while the user is being authenticated.

There is also a (clinician) route group which has a layout wrapped in a ClinicianGuard component. This component checks that a user has the clinician role before allowing access to its routes. If the user is not a clinician they will be redirected to the dashboard page. This is particularly important in the case where a clinician user is viewing the Patient Lookup page, and then uses the role toggle to change over to a patient role. We don't want to allow them to stay on the Patient Lookup page, so we redirect them to the dashboard.

A logged in user's avatar can be seen in the top right corner of the app.

## Pages

The app begins on a simple "Sign in" prompt. After signing in, the user is directed to the Dashboard page, and a Navbar appears with links to all pages, as well as role / theme toggles, a sign out button and a user avatar.

On the Dashboard page a user can view summary cards showing today's health metrics. If they click on a summary card, they can see a time series chart showing data for that metric over time for a selected range (7, 14, 30 days, or all-time).

The AI Assistant page shows a very simple chat with an AI assistant. The mocked response simply echoes back the user's question. I have shown a "Typing..." placeholder message while waiting for the API response, imitating chat applications such as WhatsApp that will be familiar to most users.

There is a Patient Lookup page which is only visible to users with the clinician role. The user can search the table of patients by any field. The search is debounced so that the table does not have to re-render on every keystroke, which could be an issue if the table was very large.

## Toggles

The patient / clinician role is stored in local storage.

There is a theme toggle that allows the user to select between light, dark, and their system's default theme.

## Layouts

I kept all layouts server-side as per next.js best practices by wrapping them in providers / guards. That way the children passed into the layout can remain server components.

## Areas for improvement

- I did not have time to meet the accessibility requirements. This is something I need to work on and take into account as I code, rather trying to add on at the end of a project.
- I did not have time to implement three of the four nice-to-haves: persisting chat history, suspense / streaming for the AI response, or UI tests.
- A very large portion of the app is client components. This was quite difficult to avoid, since almost every component is interactive in some way, or requires authentication. One way to address this would be to move authentication to the server side, so that components that need to check authentication don't have to call the <code>useAuth()</code> hook and therefore be rendered on the client side. I'm sure there are other ways I could make the client components smaller given more time and thought.
- It could be worth using a query parameter instead of <code>useState</code> for the search term on the Patient Lookup page. This would allow clinicians to share the URL of a filtered patient table with other clinicians (provided they have access to the same patient data)
- I would have liked to programmatically generate the mock time series data, and fetch today's data by matching on date, rather than relying on the fact that the mock data happens to be sorted by date.
