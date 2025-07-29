<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<div class="bg-base-300 p-4">
	<header>
		<h1 class="font-bold text-2xl">Attendance Status</h1>
		<div class="alert" role="alert">
			{#if data.attendance.length === 0}
				<div class="flex gap-2 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
						/>
					</svg>
					No one has checked in yet.
				</div>
			{:else}
				<div class="flex gap-2 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
						/>
					</svg>
					{data.attendance[0].students.length} Students have checked in today.
				</div>
			{/if}
		</div>
	</header>

	<main class="pt-4 flex gap-4 flex-col">
		<!-- <button id="checkInButton" class="btn btn-primary btn-wide">Check In</button> -->
		<div id="nameListContainer" class="card bg-base-100">
			<h2>Select Your Name:</h2>
			<ul id="studentList" class="list">
				{#each data.students as student}
					<li class="list-row">
						<form action="?/checkIn" method="post" use:enhance>
							<div class="font-bold text-lg uppercase">{student.name}</div>
							<input name="student-id" value={student.id} hidden />
							{#if student.attendance.length === 0}
								<button type="submit" class="btn btn-primary">Check In</button>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-6"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
								</svg>
								<span class="sr-only">Checked In</span>
							{/if}
						</form>
					</li>
				{/each}
			</ul>
		</div>
	</main>
</div>
