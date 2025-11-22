export const AssignmentsPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Assignments
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Access all assignments from teachers with clear visibility of due
            dates. Students can complete assignments featuring various
            question types including multiple choice, multiple answer,
            true/false, and matching questions.
          </p>
          <p>
            The assignment system provides a comprehensive platform for
            students to engage with course material. Each assignment clearly
            displays its due date, allowing students to prioritize their work
            and manage their time effectively.
          </p>
          <p>
            After completing an assignment, students can immediately view
            their results and performance feedback. This instant feedback
            helps students understand their strengths and areas for
            improvement, promoting continuous learning.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <h4 className="mb-2 font-semibold">Question Types</h4>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li>Multiple choice questions</li>
              <li>Multiple answer questions</li>
              <li>True/False questions</li>
              <li>Matching questions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

