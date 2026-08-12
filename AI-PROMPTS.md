## Prompt 1 — Project Planning 

I need to build a Student Task Manager web application called StudyFlow
for a software development assignment.

The assignment requires:
1. A completed application.
2. The prompts used during development.
3. A short explanation of how AI assisted during implementation.
4. Examples of manual improvements, corrections, or refactoring
   performed after reviewing AI-generated code.

I will use:
- React
- Vite
- JavaScript
- CSS
- LocalStorage

StudyFlow is designed for university students to manage:
- Assignments
- Quizzes
- Exams
- Projects
- Study tasks

Potential features include:
- Dashboard
- Add/edit/delete tasks
- Mark tasks as complete
- Task subjects
- Task types
- Priority
- Due dates
- Search
- Filtering
- Sorting
- Statistics
- Progress tracking
- LocalStorage
- Responsive design
- Dark/light mode

Act as a software architect and help me plan the project.

Do NOT write code yet.

Provide:
1. Functional requirements
2. Non-functional requirements
3. User stories
4. Main UI sections
5. React component architecture
6. Suggested folder structure
7. Task data model
8. State-management approach
9. LocalStorage strategy
10. Potential edge cases
11. Testing strategy
12. Recommended development order

Keep the project appropriate for a student assignment and avoid
unnecessary complexity.

## Prompt 2 — UI/UX Planning

Based on the StudyFlow requirements, design the UI/UX structure
for the application.

The target users are university students.

I want the application to feel modern, clean, simple, and professional.

Design these areas:

1. Sidebar/navigation
2. Header
3. Dashboard
4. Statistics cards
5. Search and filter controls
6. Task list
7. Task card
8. Add/edit task form
9. Empty states
10. Completed task state
11. Dark mode
12. Mobile layout

For each area explain:
- Purpose
- Important elements
- User interaction
- Responsive behavior

Do not write React code yet.

## Prompt 3 — React Architecture

Based on the StudyFlow UI plan, define a clean React component
architecture.

I want reusable components rather than putting everything inside App.jsx.

Suggest components for:
- Header
- Sidebar
- Dashboard
- StatisticsCard
- TaskList
- TaskCard
- TaskForm
- SearchBar
- FilterBar
- EmptyState
- ProgressBar

For each component explain:
- Its responsibility
- Its expected props
- Which state it should or should not own

Also suggest a simple folder structure.

Do not write the implementation yet.

## Prompt 4 — Initial React UI

Implement the initial StudyFlow React layout based on the
architecture we created.

Create:
- App
- Header
- Sidebar
- Dashboard
- StatisticsCard
- TaskList
- TaskCard
- TaskForm

Requirements:
- React functional components
- Reusable components
- Props between parent and child components
- Clean JSX
- No backend
- No LocalStorage yet
- No complex task logic yet

Focus on creating a working visual interface first.

After writing the code, explain the purpose of each component
and identify any assumptions you made.

## Prompt 5 — Task Data Model

Create a simple JavaScript data model for a StudyFlow task.

Each task should contain:
- id
- title
- description
- subject
- type
- priority
- dueDate
- completed
- createdAt

Allowed task types:
- Assignment
- Quiz
- Exam
- Project
- Study

Allowed priorities:
- Low
- Medium
- High

Explain:
1. Why each field is needed
2. Which fields should be required
3. What validation each field needs
4. How the model should support editing and filtering

Do not create backend code.

## Prompt 6 — CRUD Functionality

Implement task CRUD functionality for StudyFlow.

Requirements:

CREATE
- Add a new task from TaskForm.

READ
- Display all tasks in TaskList.

UPDATE
- Allow editing an existing task.
- Pre-fill the TaskForm with the selected task.

DELETE
- Allow deleting a task.

COMPLETE
- Allow marking a task as completed.
- Allow reopening a completed task.

Architecture requirements:
- Keep task state centralized.
- Do not duplicate task-management logic.
- Use callback props where appropriate.
- Keep presentation components separate from task state logic.

Explain the implementation after providing the code.

## Prompt 7 — LocalStorage

Implement LocalStorage persistence for StudyFlow tasks.

Requirements:

1. Load saved tasks when the application starts.
2. Save tasks whenever task state changes.
3. Use a consistent LocalStorage key.
4. Handle missing LocalStorage data safely.
5. Handle malformed JSON safely without crashing the application.
6. Keep LocalStorage logic separate from presentational components.
7. Avoid unnecessary writes where practical.

Explain why the implementation is safe and identify potential
edge cases I should manually test.

## Prompt 8 — Search

Implement task search for StudyFlow.

Search should match:
- Task title
- Description
- Subject

Requirements:
- Case-insensitive
- Search while typing
- Do not mutate the original tasks array
- Work together with filters
- Show an EmptyState component when no tasks match
- Keep filtering logic readable and reusable

## Prompt 9 — Filtering

Implement filtering for StudyFlow.

Filters should include:

Status:
- All
- Pending
- Completed

Priority:
- All
- Low
- Medium
- High

Type:
- All
- Assignment
- Quiz
- Exam
- Project
- Study

Subject:
- All subjects

Requirements:
- Multiple filters must work together.
- Search must work together with filters.
- Do not mutate the original task array.
- Keep filtering logic separate and readable.
- Reset filters correctly when requested.

## Prompt 10 — Sorting

Implement task sorting for StudyFlow.

Allow users to sort by:

1. Due date — earliest first
2. Due date — latest first
3. Priority — high to low
4. Recently added

Requirements:
- Sorting must work with search and filters.
- Do not mutate the original task array.
- Handle tasks with missing or invalid dates safely.
- Keep the sorting logic readable.

## Prompt 11 — Dashboard Statistics

Implement dynamic dashboard statistics for StudyFlow.

Display:

- Total tasks
- Completed tasks
- Pending tasks
- High-priority tasks
- Tasks due within the next 7 days

Requirements:
- Calculate values from the current task state.
- Statistics must update after add, edit, delete, and completion.
- Avoid hardcoded numbers.
- Avoid duplicating calculation logic.
- Handle an empty task list correctly.

## Prompt 12 — Progress Tracking

Add a Study Progress component to StudyFlow.

Calculate:

completion percentage =
completed tasks / total tasks × 100

Requirements:
- Handle zero tasks without division-by-zero problems.
- Round the percentage appropriately.
- Update automatically when tasks change.
- Display both percentage and completed/total count.
- Make the component reusable.

## Prompt 13 — Dark Mode

Implement dark/light mode for StudyFlow.

Requirements:
- Toggle from the header.
- Persist the selected theme in LocalStorage.
- Restore the theme after refresh.
- Update the entire application consistently.
- Ensure sufficient text/background contrast.
- Ensure cards, inputs, buttons, sidebar, and task states work in both themes.
- Avoid duplicating unnecessary CSS.

## Prompt 14 — Responsive Design

Review the StudyFlow CSS for responsive design.

The application must work at:

- 1440px desktop
- 1024px laptop
- 768px tablet
- 375px mobile

Review:
- Sidebar
- Header
- Statistics cards
- Search controls
- Filter controls
- Task cards
- Task form
- Buttons
- Navigation

Identify likely problems first.

Then provide targeted CSS improvements.

Do not rewrite the entire stylesheet unnecessarily.
Do not change application functionality.

## Prompt 15 — Accessibility Review

Perform an accessibility review of the StudyFlow React application.

Check:
- Form labels
- Button names
- Keyboard navigation
- Focus states
- Color contrast
- Semantic HTML
- Error messages
- Status indicators
- Screen-reader-friendly labels

First identify problems.
Then suggest specific improvements.

Do not rewrite unrelated code.

## Prompt 16 — Code Review

I have completed the first version of my StudyFlow Student Task Manager.

I want you to act as a code reviewer.

Do not rewrite the project.

Instead, identify:
1. Potential bugs
2. Code duplication
3. State-management problems
4. Accessibility problems
5. Responsive design issues
6. LocalStorage risks
7. Edge cases
8. Unnecessary complexity
9. Performance concerns

For each issue:
- Explain why it is a problem.
- Give its severity: Low, Medium, or High.
- Suggest a fix.

I will decide manually which suggestions to implement.