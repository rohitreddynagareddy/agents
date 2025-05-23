# Master AI Agentic Engineering - Autonomous AI Agent Development Course

Welcome to the repository for the "Master AI Agentic Engineering" course! This course is a 6-week journey designed to equip you with the knowledge and skills to build and deploy autonomous AI agents using a variety of cutting-edge frameworks and technologies.

## Structure of the Repository

The repository is organized into several key sections to guide you through the course material:

*   **Numbered Directories (Weeks 1-6):** Each directory corresponds to a week of the course, focusing on a specific theme or technology:
    *   `1_foundations/`: **Week 1 - Foundations.** Introduces fundamental concepts of interacting with Large Language Models (LLMs) via APIs (primarily OpenAI). Covers building simple applications with Gradio, basic prompt engineering, and an introduction to function calling.
    *   `2_openai/`: **Week 2 - OpenAI Agents SDK.** Focuses on the `openai-agents` library for building more structured agents. Explores creating individual agents, multi-agent collaboration for tasks like research, and using the SDK's tracing capabilities for observability.
    *   `3_crew/`: **Week 3 - CrewAI.** Introduces the CrewAI framework for orchestrating role-based, collaborative AI agents. Covers defining agents with specific roles, goals, and backstories, assigning them tasks, and managing their execution flow.
    *   `4_langgraph/`: **Week 4 - LangGraph.** Dives into LangGraph for building stateful, multi-actor applications. Explores creating cyclical graphs, managing state, integrating various tools (web browsing, file system), and implementing complex agentic loops with evaluation and self-correction.
    *   `5_autogen/`: **Week 5 - AutoGen.** Focuses on Microsoft's AutoGen framework. Covers building multi-agent conversational applications, dynamic agent creation at runtime, and hints at distributed agent architectures using gRPC.
    *   `6_mcp/`: **Week 6 - Model Context Protocol (MCP).** Explores using the OpenAI Agents SDK with MCP to integrate a wide array of external tools and services. Features a complex multi-agent financial trading simulation as a capstone example.

*   `guides/`: This directory contains a series of self-study guides designed to build your technical expertise on topics relevant to the course. These include:
    *   Command-line usage
    *   Git and GitHub
    *   Technical foundations (environment variables, networks, APIs)
    *   Jupyter Notebooks
    *   Python foundations (basic to intermediate, including async)
    *   "Vibe coding" with LLMs and debugging techniques
    *   Understanding AI APIs, Ollama for local models, and project startup advice.
    *   *(Refer to `guides/01_intro.ipynb` for a full list and introduction.)*

*   `setup/`: This directory provides comprehensive instructions for setting up your development environment across different operating systems (Windows, WSL, macOS, Linux). It includes:
    *   Platform-specific setup files (`SETUP-PC.md`, `SETUP-mac.md`, etc.).
    *   A Python script (`diagnostics.py`) to help identify and report setup issues.
    *   An interactive Jupyter notebook (`troubleshooting.ipynb`) for step-by-step problem-solving.

## How to Get Started

1.  **Review the Original README (`README.md.original`):** Before diving into setup or weekly content, please read `README.md.original`. It contains crucial information about the course philosophy, instructor contact details, API cost considerations, and general advice for success in the course.
2.  **Set Up Your Environment:** Navigate to the `setup/` directory and follow the specific guide for your operating system (e.g., `SETUP-PC.md`, `SETUP-mac.md`). This is critical for ensuring all tools and dependencies are correctly installed. Use `troubleshooting.ipynb` and `diagnostics.py` in the same folder if you encounter issues.
3.  **Start with Week 1:** Once your environment is ready, head to the `1_foundations/` directory. It's recommended to progress through the numbered directories sequentially, as concepts often build upon each other.
4.  **Utilize the Guides:** Refer to the notebooks in the `guides/` directory for self-paced learning on foundational topics that will support your journey through the course.

## Content Overview of Each Module

Here's a brief overview of what you'll find in each weekly module:

*   **`1_foundations/` (Foundations):**
    *   **Topic:** Basics of LLM interaction, simple app development.
    *   **Concepts/Projects:** Using the OpenAI API, creating Gradio web UIs, function calling, RAG example with a personalized chatbot.

*   **`2_openai/` (OpenAI Agents SDK):**
    *   **Topic:** Building agents with the `openai-agents` library.
    *   **Concepts/Projects:** Defining `Agent` and `Runner` objects, multi-agent collaboration for a "Deep Research" task (planning, searching, writing, emailing), Pydantic for structured data, observability via tracing.

*   **`3_crew/` (CrewAI):**
    *   **Topic:** Orchestrating role-based AI agent crews.
    *   **Concepts/Projects:** Defining agents with roles/goals/backstories, assigning tasks, sequential task execution. Examples include a "Coder" crew that writes and executes code. Configuration is managed via YAML files.

*   **`4_langgraph/` (LangGraph):**
    *   **Topic:** Building stateful, multi-actor agentic applications.
    *   **Concepts/Projects:** `StateGraph` for defining state and flow, nodes as processing units, conditional edges for dynamic routing. The "Sidekick" project demonstrates a worker-evaluator loop with tool integration (web browsing, file management) and persistent memory.

*   **`5_autogen/` (AutoGen):**
    *   **Topic:** Developing multi-agent conversational applications with dynamic agent creation.
    *   **Concepts/Projects:** `AssistantAgent` for conversations, tool integration (e.g., SQLite DB for flight prices), dynamic agent generation by a "Creator" agent, and gRPC for potential distributed setups.

*   **`6_mcp/` (Model Context Protocol):**
    *   **Topic:** Extending OpenAI Agents with external tools via MCP.
    *   **Concepts/Projects:** `MCPServerStdio` for integrating tools as external services. A sophisticated multi-agent financial trading simulation showcases agents (Traders, Researchers) using various LLMs and MCP-provided tools for market data, search, and account management, monitored by a Gradio dashboard.

## Community Contributions

Each numbered weekly directory (e.g., `1_foundations/`, `2_openai/`, etc.) contains a `community_contributions/` subdirectory. These folders house projects, examples, and explorations shared by the course community.

*   **Content:** You'll find a variety of contributions, including:
    *   Alternative solutions or extensions to course labs.
    *   Projects applying the weekly concepts to new domains.
    *   Explorations with different LLMs or tools.
    *   In later weeks (`4_langgraph` onwards), contributions are often consolidated into a `community.ipynb` notebook, which might contain smaller examples, discussions, or links.
*   **Purpose:** These contributions offer diverse perspectives and practical applications of the course material.

## Original Main README (`README.md.original`)

As mentioned in "How to Get Started", the `README.md.original` file contains the original welcome message, course philosophy, instructor information, detailed notes on API costs, and other vital context for the course. This new `README.md` you are currently reading serves as a technical guide to the repository's structure and content.

---

We hope this structured overview helps you navigate the repository and make the most of your AI Agentic Engineering learning experience. Happy building!
