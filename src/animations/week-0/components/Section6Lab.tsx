"use client";

import React from "react";
import CurriculumLab from "@/components/curriculum/CurriculumLab";
import { Beaker } from "lucide-react";
import CodeBlock from "@/components/mdx/CodeBlock";

export default function Section6Lab() {
  const taskData = [
    {
      title: "Create Databricks Community Edition Account",
      steps: [
        "Navigate to community.cloud.databricks.com",
        "Create cluster: globalmart-dev-[yourname]",
        "Runtime: 14.3 LTS  |  Mode: Single Node",
        "Auto-terminate: 120 min"
      ]
    },
    {
      title: "Create GlobalMart Database Schema",
      steps: [
        "Create notebook: 00_setup_databases",
        "Run validation cell (code block above)",
        "Create Bronze / Silver / Gold databases",
        "Create raw_products table with 3 sample rows"
      ]
    },
    {
      title: "Initialize GitHub Repository",
      steps: [
        "Create repo: globalmart-data-platform (Private)",
        "Create folders: notebooks/ | src/ | tests/ | docs/ | config/",
        "Commit: feat(week-0): initialize project structure"
      ]
    },
    {
      title: "Connect Databricks Repos to GitHub (CHALLENGE)",
      challenge: true,
      steps: [
        "Go to Repos tab in Databricks sidebar",
        "Add Repo → connect globalmart-data-platform",
        "Create a notebook inside the Repo",
        "Commit via Databricks Repos UI",
        "Verify commit appears in GitHub ✅"
      ]
    }
  ];

  const rawPython = `from pyspark.sql import Row
from datetime import datetime, timezone

sample_products = [
    Row(product_id="P-001", sku="SKU-88821", product_name="UltraBook Pro 15",
        category="Electronics", subcategory="Laptops", unit_cost=450.00,
        unit_price=899.99, supplier_id="SUP-0042", is_active=True,
        _source_system="SAP_ERP", _ingested_at=datetime.now(timezone.utc)),

    Row(product_id="P-002", sku="SKU-32201", product_name="ErgoDesk Chair",
        category="Home", subcategory="Office Furniture", unit_cost=85.00,
        unit_price=249.99, supplier_id="SUP-0017", is_active=True,
        _source_system="SAP_ERP", _ingested_at=datetime.now(timezone.utc)),

    Row(product_id="P-003", sku="SKU-11043", product_name="CloudRun Sneakers",
        category="Apparel", subcategory="Footwear", unit_cost=32.00,
        unit_price=119.99, supplier_id="SUP-0031", is_active=True,
        _source_system="SAP_ERP", _ingested_at=datetime.now(timezone.utc)),
]

df = spark.createDataFrame(sample_products)
df.write.format("delta").mode("append").saveAsTable("globalmart_bronze.raw_products")

display(spark.table("globalmart_bronze.raw_products"))
print("✅ 3 sample products inserted into Bronze layer")`;

  return (
    <CurriculumLab
      badgeText="Hands-On Lab"
      badgeIcon={<span className="text-xl">🧪</span>}
      title="Lab 0: Provisioning the Environment"
      objective={<><span className="font-bold text-[#38bdf8]">Objective:</span> By the end, you have Databricks configured, GitHub repo initialized, and your workspace live — exactly like Day 1 at a real DE job.</>}
      duration="90m"
      tasks={taskData}
    >
      <div className="flex flex-col gap-4 mt-8">
        <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase flex items-center gap-2">
           <Beaker className="w-4 h-4" /> Raw Products Insert Script (PySpark)
        </h4>
        <div className="rounded-xl overflow-hidden shadow-2xl border border-[#253141]">
           <CodeBlock language="python">{rawPython}</CodeBlock>
        </div>
      </div>

      <div className="bg-[#141B23] border border-[#253141] rounded-2xl overflow-hidden p-6 shadow-xl mt-4">
         <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase mb-4">Expected Output Table</h4>
         <div className="overflow-x-auto rounded-lg border border-[#253141]">
            <table className="w-full text-left text-sm text-[#D1D5DB]">
              <thead className="text-[11px] font-mono tracking-wider uppercase bg-[#1A232E] text-[#9CA3AF]">
                <tr>
                  <th className="px-4 py-3 border-b border-[#253141]">product_id</th>
                  <th className="px-4 py-3 border-b border-[#253141]">sku</th>
                  <th className="px-4 py-3 border-b border-[#253141]">product_name</th>
                  <th className="px-4 py-3 border-b border-[#253141]">category</th>
                  <th className="px-4 py-3 border-b border-[#253141]">unit_price</th>
                  <th className="px-4 py-3 border-b border-[#253141]">is_active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#253141]/50">
                <tr className="hover:bg-[#1A232E]/50">
                  <td className="px-4 py-3 font-mono text-[#F97316]">P-001</td><td className="px-4 py-3">SKU-88821</td><td className="px-4 py-3 font-bold text-white">UltraBook Pro 15</td><td className="px-4 py-3">Electronics</td><td className="px-4 py-3 font-mono">899.99</td><td className="px-4 py-3 text-[#22c55e]">true</td>
                </tr>
                <tr className="hover:bg-[#1A232E]/50">
                  <td className="px-4 py-3 font-mono text-[#F97316]">P-002</td><td className="px-4 py-3">SKU-32201</td><td className="px-4 py-3 font-bold text-white">ErgoDesk Chair</td><td className="px-4 py-3">Home</td><td className="px-4 py-3 font-mono">249.99</td><td className="px-4 py-3 text-[#22c55e]">true</td>
                </tr>
                <tr className="hover:bg-[#1A232E]/50">
                  <td className="px-4 py-3 font-mono text-[#F97316]">P-003</td><td className="px-4 py-3">SKU-11043</td><td className="px-4 py-3 font-bold text-white">CloudRun Sneakers</td><td className="px-4 py-3">Apparel</td><td className="px-4 py-3 font-mono">119.99</td><td className="px-4 py-3 text-[#22c55e]">true</td>
                </tr>
              </tbody>
            </table>
         </div>
      </div>
    </CurriculumLab>
  );
}
