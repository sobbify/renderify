# KAGGLE RUNBOOK

Kaggle is the execution surface for expensive reconstruction work. This directory contains the code/config push helpers and output fetch helpers.

## Operating rule

The local machine edits and reviews. Kaggle runs SfM, depth, splat training, and packaging. Never treat an unverified output as a release bundle. Fetch the artifact, inspect its metadata and QA result, then stage it under `test/<capture>/web/`.

Read the PowerShell helpers before use. They assume the Kaggle CLI is already authenticated and that the dataset/kernel names are configured for the current sobmachine workspace.
