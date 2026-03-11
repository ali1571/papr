'''
 {
  "subject_name": "Physics",
  "subject_code": "5054",
  "year": 2024,
  "session": "w",
  "paper": "P4",
  "variant": "V2",
  "doc_type": "qp",
  "file_url": "https://xyz.supabase.co/storage/v1/object/public/past-papers/downloads/physics/24/winter/5054_w24_p4_v2_qp.pdf"
}
'''
import os
import json





def transform_to_nested(all_files_data):
    result = {"subjects": []}

    # Step 1: Group by (subject_code, subject_name, year)
    subject_groups = {}

    for file_data in all_files_data:
        # Create a unique key for each subject+year combination
        key = (file_data['subject_code'], file_data['subject_name'], file_data['year'])

        if key not in subject_groups:
            subject_groups[key] = []

        subject_groups[key].append(file_data)

    # Step 2: For each subject+year group, build the nested structure
    for (subject_code, subject_name, year), files in subject_groups.items():

        subject_obj = {
            "subject_name": subject_name,
            "subject_code": subject_code,
            "year": year,
            "sessions": {}
        }

        # Step 3: Build sessions/papers/variants for this subject
        for file_data in files:
            session = file_data['session']
            paper = file_data['paper']
            variant = file_data['variant']
            doc_type = file_data['doc_type']
            url = file_data['url']

            # Ensure session exists
            if session not in subject_obj["sessions"]:
                subject_obj["sessions"][session] = {"papers": {}}

            # Ensure paper exists
            if paper not in subject_obj["sessions"][session]["papers"]:
                subject_obj["sessions"][session]["papers"][paper] = {"variants": {}}

            # Ensure variant exists
            if variant not in subject_obj["sessions"][session]["papers"][paper]["variants"]:
                subject_obj["sessions"][session]["papers"][paper]["variants"][variant] = {"doc_types": {}}

            # Add the doc_type and URL
            subject_obj["sessions"][session]["papers"][paper]["variants"][variant]["doc_types"][doc_type] = url

        result["subjects"].append(subject_obj)

    for subject in result["subjects"]:
        for session_key, session in subject["sessions"].items():
            for paper_key, paper in session["papers"].items():
                for variant_key, variant in paper["variants"].items():
                    # Sort doc_types: qp first, then ms, then in
                    sorted_docs = {}
                    if 'qp' in variant["doc_types"]:
                        sorted_docs['qp'] = variant["doc_types"]['qp']
                    if 'ms' in variant["doc_types"]:
                        sorted_docs['ms'] = variant["doc_types"]['ms']
                    if 'in' in variant["doc_types"]:
                        sorted_docs['in'] = variant["doc_types"]['in']

                    variant["doc_types"] = sorted_docs

    return result



def build_url(root, filename):
    Base = 'https://xyz.supabase.co/storage/v1/object/public/past-papers/'
    # Normalize path separators
    root = root.replace("\\", '/')
    # Extract only the part after 'downloads/'
    if 'downloads/' in root:
        relative_path = root.split('downloads/')[1]
        url = Base + 'downloads/' + relative_path + '/' + filename
    else:
        url = Base + root + '/' + filename
    return url


def parse_single_file(filename, root):
    subject_mapping = {
        '5070': 'Chemistry',
        '5054': 'Physics',
        '4024': 'Mathematics',
        '2210': 'Computer Science',
        '2058': 'Islamiat',
        '2281': 'Economics',
        '2059': 'pkst'
    }

    filename_clean = filename.replace('.pdf', '')
    filename_list = filename_clean.split('_')

    # Validate filename format (either 4 or 5 parts)
    if len(filename_list) not in [4, 5]:
        return None

    subject_code = filename_list[0]

    # Skip if subject code not in mapping
    if subject_code not in subject_mapping:
        return None

    subject_name = subject_mapping[subject_code]
    year = filename_list[1]
    session = year[0]
    year = int('20' + year[1:])

    # Handle different formats
    if len(filename_list) == 5:
        # Standard format: 5054_w24_p4_v2_qp
        paper = filename_list[2].upper()
        variant = filename_list[3].upper()
        doc_type = filename_list[4]
    else:
        # pkst format: 2059_s18_qp_p1
        doc_type = filename_list[2]
        paper = filename_list[3].upper()
        variant = 'V1'  # Default variant for pkst

    return {
        'subject_code': subject_code,
        'subject_name': subject_name,
        'year': year,
        'session': session,
        'paper': paper,
        'variant': variant,
        'doc_type': doc_type,
        'url': build_url(root, filename)
    }


def process_all_pdfs():
    all_files_data = []

    for root, dirs, files in os.walk('X:/code/PastpaperScraper/downloads/'):
        for file in files:
            if file.endswith('.pdf'):
                file_data = parse_single_file(file, root)
                if file_data:  # Only add if parsing was successful
                    all_files_data.append(file_data)

    # Now transform ALL the data
    nested_result = transform_to_nested(all_files_data)
    print(json.dumps(nested_result, indent=2))

process_all_pdfs()
