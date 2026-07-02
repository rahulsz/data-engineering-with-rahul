# SQL Content Summary

## Where is the Content?
The newly added SQL curriculum and associated visualizers are located in the following directory from the Academy project:
`d:\Projects\data-engineering-academy\content\sql`

## What Content was Added?
A comprehensive set of **101 Markdown (MDX) modules** has been added, creating an end-to-end "Master SQL Reasoning Framework." The content includes:
- **Core Fundamentals:** Architecture, Data Types, `SELECT`, `WHERE`, `GROUP BY`, `HAVING`, etc.
- **Joins & Relationships:** Primary/Foreign keys, normalizations, Inner/Left/Right/Full/Self/Cross joins, and Join optimizations.
- **Advanced Querying:** CTEs, Recursive CTEs, Window Functions (`RANK`, `DENSE_RANK`, `LEAD`, `LAG`), Subqueries, and set operations (`UNION`, `INTERSECT`).
- **Database Architecture:** ACID Transactions, MVCC, Indexing (BTree, Composite, Covering), Query Plans, and Data Skew.
- **Data Engineering Patterns:** Dimensional modeling, Star/Snowflake schemas, SCDs, and DBT/ETL/ELT SQL patterns.
- **Interview Prep & Case Studies:** Specific interview modules for Amazon, Google, Uber, Netflix, and Databricks.

## How Many Visualizers?
There are **23 Interactive Visualizers** implemented across the SQL content. 
These are embedded using the `<VisualizerEmbed name="..." />` component alongside **23 context-aware `<DatabaseSchema db="..." />`** diagram components to synchronize the database schema visually.

Some examples of the specific visualizers embedded include:
- `ExecutionOrder`
- `SelectVisualizer`
- `WhereVisualizer`
- `JoinVisualizer`
- `WindowFunctionVisualizer`
- `CTEVisualizer`
- `QueryPlanVisualizer`
- `BTreeIndexVisualizer`
- `AcidVisualizer`
