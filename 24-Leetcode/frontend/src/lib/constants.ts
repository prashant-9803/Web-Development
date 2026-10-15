export const BACKEND_URL = "http://localhost:4000";

export type Status = "" | "Processing" | "Success" | "Failure";

export const LANGUAGE_PLACEHOLDERS: Record<string, string> = {
  "C++": `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  Python: `def solution():
    print("Hello, World!")

solution()`,
  JS: `function solution() {
    console.log("Hello, World!");
}

solution();`,
};

export const LANGUAGE_LABELS: Record<string, { ext: string; runtime: string }> =
  {
    "C++": { ext: "cpp", runtime: "C++17 · GCC" },
    Python: { ext: "py", runtime: "Python 3.11" },
    JS: { ext: "js", runtime: "Node.js 20" },
  };
