export const AssignmentCreationPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Assignment Creation
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Create comprehensive assignments with full control over question
            types and formats. Teachers can select from various question
            types, flexibly configure answer options, and set up assignments
            that best suit their assessment needs.
          </p>
          <p>
            The assignment creation system provides teachers with powerful
            tools to design engaging and effective assessments. Teachers can
            create assignments with multiple question types, set due dates,
            and configure various settings to match their teaching
            objectives.
          </p>
          <p>
            After students complete assignments, teachers can view individual
            student results and performance, as well as access statistical
            analysis including class averages and other metrics. This data
            helps teachers identify areas where students may need additional
            support and adjust their teaching strategies accordingly.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <h4 className="mb-2 font-semibold">Key Capabilities</h4>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li>
                Select from various question types (multiple choice, multiple
                answer, true/false, matching)
              </li>
              <li>
                Flexibly configure how many answer options are shown
              </li>
              <li>
                View individual student results and performance
              </li>
              <li>
                Access statistical analysis including class averages and
                other metrics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

