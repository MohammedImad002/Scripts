#!/bin/bash

# Define the common parameters
HOST="localhost:27017"
SSL="" # No SSL for local MongoDB
USERNAME=""
PASSWORD=""
DB="--db lms"
WORKERS="--numInsertionWorkers 4"

# Define an array of collections
COLLECTIONS=("assignment_submissions" "assignments" "authors" "basic_test_submits" "basic_tests" "batch_assignments" 
"batch_courses" "batches" "boards" "branch_courses" "branches" "bulk_upload_files" "chapters_v2" "courses" 
"courses_v2" "departments" "designations" "docquestions" "draganddrops" "erp_users" "fillintheblanks" 
"game_submits" "games" "getgamedataapis" "getgamedatas" "institute_courses" "institute_settings" "institutes" 
"institutetests" "institutetests_v2" "jumbledquestions" "keychallenges" "listenfills" "lms_chapters" "lms_courses" 
"lms_subjects" "lms_subtopics" "lms_topics" "master_data" "matchfollowings" "materials" "mcq2options" 
"mcq3options" "mcq4options" "practicetests" "published_materials" "qr_codes" "questions_QR" "questions_v2" 
"quizzes" "socket_connections" "student_course_assignments" "sub_topics_v2" "subjects" "subjects_v2" 
"submitinteractivegames" "submitinteractivetests" "submitpracticetests" "submitquizzes" "submittests" 
"superadmintesttemplates" "topics" "topics_v2" "truefalses" "units_v2" "users")

# Iterate over collections and corresponding files
for ((i = 0; i < ${#COLLECTIONS[@]}; i++)); do
    COLLECTION="--collection ${COLLECTIONS[i]}"
    FILE="--file ./db/${COLLECTIONS[i]}.json"

    # Run mongoimport command
    mongoimport --host $HOST $SSL $USERNAME $PASSWORD $DB --type json --jsonArray $WORKERS $COLLECTION $FILE

    # Add any additional options as needed
done
