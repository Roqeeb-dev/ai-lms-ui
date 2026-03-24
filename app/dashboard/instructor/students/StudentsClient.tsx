export default function StudentsClient() {
  return (
    <main>
      <h1>This is the page for the instructor to manage all students</h1>
    </main>
  );
}

//top part: instructor level metrics

// mid oart: course level metrics

// student level data

// {
//   overview: {
//     totalStudents: number;
//     activeStudents: number;
//     averageProgress: number;
//     completionRate: number;
//   },

//   courses: [
//     {
//       courseId: string;
//       title: string;
//       studentCount: number;
//       averageProgress: number;
//       completionRate: number;
//     }
//   ],

//   students: [
//     {
//       id: string;
//       name: string;
//       email: string;
//       enrolledCourses: number;
//       overallProgress: number;
//       lastActive: string;
//       status: "active" | "inactive";
//     }
//   ]
// }
