# Challenge

Welcome to the challenge!

Some packages are already being installed for you below - you can just start reading the below text while that finishes.

## The Introduction

The following script takes you through tasks you should complete as part of your challenge. Some tasks may be tricky, some may be easy. In every case you are encouraged to pose written questions to the task itself, write down questions/observations or reasoning about why you did not find a solution. In most cases though, a working solution will be achievable. In all cases it will be helpful if add notes about your methodology (e.g.: "I did X using Y because of Z, then A happened which I fixed doing B. I should have seen A coming but didn't because of C").

There will be no loop with the reviewer, so nobody is going to answer your notes, questions, musings, ... - their main aim is to showcase your thought process for a fellow developer who will inspect this challenge. For the texts you can write everything from a bullet list to a book, but be aware that in development we usually try to optimize for a combination of dense information + understandability by every team member. We firmly believe that good communication and conceptualization is as important to being a developer as the coding itself.

The challenge tries to be similar to the real-world with the kinds of problems and solutions that would occur in every-day-project-work. There will be no questions asking you to optimize runtime-complexity in O-notation to the max for algorithm Y - these sort of questions do not make any sense in our opinion. Being close to the real-world also means that you may bring in CSS/JS Libraries to help you develop, just make sure that everything still runs in stackblitz.

The tool we use here is called `stackblitz`. It functions as a fully integrated development environment (IDE). You can go through the full challenge here. If you want to use your local environment you can also download the project using the small "cloud icon" at the top left corner of the screen, just right of "Project". _In the end, the challenge code must run in here inside `stackblitz`, so `pnpm run dev` has to work. If this is not the case, we will not be able to review your challenge!_

## Tech-Stack

You can skip this section and revisit it later, as the right information will be shared with you at the right places and everything should "just work" as we inteded it to work. If you still want to learn more right now, read on!

This is a "fullstack" TypeScript project using nuxt3 + vue3. Fullstack TypeScript means that we use one typescript code base for both the backend API + the frontend webapp. We have defined helper commands for development, testing, running the app in production, linting, ... that are runnable via `pnpm run X` where X is the command, checkout the `package.json` for more.

For styling we use TailwindCSS, so far the zoo has not added a CSS component framework to use pre-made components, maybe you will? For testing we use `vitest`, for linting `eslint`.

This information will also be shared with you where needed as part of the challenge, so there is no need to dive into anything at all for now.

## The Challenge

So, without further ado: Welcome, new IT Director of the Cologne Zoo! As you can see, the zoo dashboard was badly damaged by the recent malware attacks from the Duisburg Zoo. The old IT Director quit after that attack as he just could not take it anymore. The staff is looking to you to fix this mess and bring the zoo dashboard back to its former glory! 🐻 🐵 Sadly the IT-Department has been underfunded for years before the attack - so the application is quite dated.

### Task 1: Take stock of the repository

In a first step you should inspect the health of the project and report on everything you notice while doing so. This will help you determine what repairs are necessary in the coming steps.

Please take stock fo the page using developer tools, your instincts, ... and write down below what you find.

// Your solution:
This Nuxt project has a couple of “rough edges” which should be addressed/changed before it is fully “solid”. First, committing the .nuxt folder is a beginner mistake that increases the repo size, breaks tsconfig extends when freshly cloned, and leads to inconsistent dev vs prod behavior. Then there is @nuxt/test-utils/module included in the main modules array, which is test/dev only and silently inflates the production build or breaks stuff at runtime with weirdness. There is NO read-me file, so anyone new starting in this project is lost from the first moment. The age calculator is broken, too, as it uses Math.round() when the tests expect rounding up conservatively to say that if a baby has a birthday today, it is 1 year old, not 0. On top of that, the ms / 365.25 calculation totally disregards leap years and isn’t accurate enough for actual use. Package manager inconsistency is another minor annoyance, pnpm rules the project except one random “test-for-reviewer” script still calls npm. And while Vitest tests exist, there is no CI pipeline in place.

### Task 2: Get the basics running again

Now that we know that is broken, let's try to get things running again, step by step. First we should aim to just get the project to start. Please fix the problem that stops `pnpm run dev` from working out. Then:

- document the loaded page with a brief description,
- document the problems that needed to be resolved to make it work (so that we can avoid and quicker fix them in the future!)

Zookeepers reported that the error sometimes changes when reloading the page after the initial start.

// Your solution:
I moved alert() to Client-Side Lifecycle Hook, in this way it only run browser-specific code after the component mounts on the client. Also i completely delete .nuxt folder and modify the tsconfig.json to allow nuxt to by itslef generate it. at the end there was a problem about @nuxt/test-utils/module, this module is for Test and shouln´t load on Runtime, so i modify nuxt.config.ts and delete thisd line of code '@nuxt/test-utils/module'\
Also for showing table content, i found several issues in useAnimals.ts & TheAnimalTable.vue.\
in useAnimals.ts, ref and onMounted are used but not imported from 'vue', onMounted(fetch) runs during SSR → will throw onMounted is not a function or similar, o error handling for the $fetch call.\

### Task 3: Start the documentation

You got it to work! Nice, now the basic functionality is back for the zookeepers. This would be a great point to start on documenting the project. As you can see there is not even a readme file! The old IT Director seems to have left this project in bad shape. Please add documentation with basics on the project, how to start, stop, test, ... it and whatever else information you deem important.

Add your solution below, either as an inline text or link to new documentation file(s) you've created.

// Your solution: In README-V1.md

### Task 4: Test fixing

There's a failing test that for the age calculation helper. Can you figure out what is broken in the implementation or the test it is and resolve the problem? All zookeepers are really interested in what is going on here.

// Your solution: The test for the age calculation function expects the age to always be rounded up (using ceil) and to return 1 year even if the animal was born today (not 0), because zookeepers prefer to conservatively assume an animal is older rather than younger. The current implementation in useCalculateAgeInYears.ts uses Math.round, which returns 0 when the fractional year is less than 0.5 or when the birth date is today, causing the test expect(useCalculateAgeInYears(today)).toBe(1) to fail. The correct fix is to replace it with Math.ceil to always round upward and wrap it in Math.max(1, ...) to guarantee a minimum age of 1, even for zero or negative differences. This aligns perfectly with the business requirement of conservative age estimation, so the issue lies in the current implementation, not in the test itself.

### Task 5: UI Fixing and Improvement

The zookeepers report that the table is incomplete and different than usually. More specifically:

- they are missing the `Name` column that used to be in _third_ place,
- the table is sorted by weight, it used to be sorted by name,
- the age of the animals should show the age in years and not the birthdate
    - a composable for this already exists, made by the previous zookeeper

Please fix the two above problems and outline what was necessarry to do so.

// Your solution: i declare a function for sorting by names (animalsSortedByName), also add names (<td>{{ animal.name }}</td>) and even create a uniqe key for each animals.

### Task 6: UI Feature 1

The zookeepers want to be able to see all details of an animal. Please create such a view that allows them to do so, outline anything about your process while adding the view below. The zookeepers didn't have time for more information, sorry. They'll surely be glad to criticize the first version intensly though and will want to know why you went for the approach you chose.

// Your solution: To create the animal detail view, I set up a dynamic route in Nuxt that allows zookeepers to access specific profiles through shareable URLs, ensuring deep linking works naturally. I leveraged the existing useAnimals composable to fetch data efficiently, but since the API didn't always guarantee a unique ID, I implemented a resilient fallback system that generates slugs from the animal's species and name to prevent broken navigation. I kept the logic consistent by reusing the same inline age calculation function across both the table and detail page, and I made sure to handle every edge case—like loading states, errors, or missing animals—with clear, user-friendly feedback. The result is a clean, responsive layout that matches the dashboard's design, is fully type-safe and SSR-compatible, and lays a solid foundation for future features like editing or photo uploads.

### Task 7: Logic Feature

The zookeepers want a new feature: Calculate the food required for the next calendar month. Basically, the zookeepers want to ease their job and buy a month worth of food in advance. In order to do so they want you to calculate and display the food all animals need for the next month.

To calculate the food an animal needs in kilograms in 1 day, the zookeepers use the following formula:

1. Take height + weight and divide it by 250
2. If the animal is:
    - older than 20 years, half the required food,
    - younger than 2 years, double the required food
3. Cherrys have less calories, so if the favourite fruit of the animal are cherries, add 28 kg
4. If the animal is male, add 20 %
5. If the animal is a fish: The required food is 0 kg

// Your solution: To implement this feature, I created a dedicated composable (useFoodCalculator) and a new component (FoodSummary) that applies the exact requested formula, including base calculations based on height and weight, age adjustments (reducing for seniors and increasing for young animals), adding specific amounts for cherry preferences, applying multipliers for males, and fully exempting fish. Finally, I extended these calculations for the number of days in the upcoming month to display both the total sum and per-animal details directly on the dashboard, making monthly food purchasing easier for the keepers.

### Task 8: Plan New Feature

After the disastrous specification of the new UI feature in the previous task, the zooplanners now want to sit down with you to plan the next feature better before implementation begins. Together you come up with requirements that you write down from the user-perspective (the zookeepers):

- I want to plan when to feed which animal,
- Per animal I want to be able to plan a day + a fruit that I feed them
- There should be an overview of all upcoming feeding tasks that tells me:
    - the animal name,
    - the food fruit,
    - the required amount of food
- the required amount of food is calculated using the algorithm from the previous task
- Tasks should be grouped by day, so that I have something like a "todo" list for each day
    - so for exmaple a structure like:
        - 24.03.2012
            - Anni, Bananas, 20kg
            - Belfried, Cherries, 10kg
        - 27.03.2012
            - ...
        - ...

Please create a breakdown for this feature. You can focus on aspects like: What tasks do we need to cover, what should their order be, how will the UI/UX be designed, what questions arise from the potentially inconsistent or incomplete staff requirements?

Don't spend more thatn 15-30 minutes here - planning like this can quickly become quite complex and we want to prevent this challenge taking too much of your time!

// Your solution: For this feature planning task, I adopted a time-boxed, user-centered approach to translate the zookeepers' requirements into an actionable implementation plan: I first formalized their needs into clear user stories (scheduling feedings per animal, auto-calculating food amounts using the existing algorithm, and displaying tasks grouped by date), then broke the work into four phased deliverables—data modeling (FeedingTask interface + useFeedingSchedule composable with localStorage persistence), UI components (form for task creation, grouped list view, and individual task items), integration with the main dashboard, and polish/validation—while proposing a simple two-column layout (form + grouped todo list) for the initial UI to prioritize clarity over complexity; critically, I also documented 10 open questions (e.g., recurrence, permissions, editing rules) to clarify ambiguities before coding, and defined acceptance criteria and a ~2-day effort estimate to keep scope focused and prevent over-engineering, ensuring the team could move forward confidently without getting stuck in analysis paralysis.

### Task 9: Finish the documentation

Revisit docs from step 3, see if you want to add anything. Also think about bonuses. Add a general comment about anything (inside the universe of the challenge or out of it) if you want to.

// Your solution: Check README.md
