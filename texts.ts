import { generateID, generateTwoNumbers } from "./src/pages/AddCandidatePage";

export const baseURL = 'https://amr-il.veritas-hr.com/' // qa-


export const BRANCH_NAME1 = 'prodBranch' + generateTwoNumbers()
export const BRANCH_NAME2 = 'prodBranch' + generateTwoNumbers()


export const ROLE_NAME = 'interviewer role11' + generateTwoNumbers()

export const EMAIL_TEMPLATE_NAME = 'template candidate'
export const INTERVIEWER_EMAIL_TEMPLATE_NAME = 'template interviewer'
export const SMS_TEMPLATE_NAME = 'template SMS'
export const FORM_TEMPLATE_NAME = 'template form'


export const EMAIL_CONTENT_CANDIDATE = `!!מועמד
[link="aaaaaaaaa.com" text="111"]
veritas [veritas_test_link]
[interviewer] מראיין
[online_form_link] שאלון מקוון
[img="2233785452393989298" url="ששששש" title="שששש"]
[candidate_name] שם
[candidate_status] סטטוס
[decline_reason] סיבת דחיה
[ec_event_address] כתובת אירוע
[ec_event_date] תאריך אירוע
[ec_event_start_time] תחילת אירוע
[interviewer] מראיין
[now] תאריך עכשווי
[online_form_link] שאלון אונליין
[organization_name] שם ארגון
[pending_reason] סיבת המתנה
[position] משרה
[process_start_date] תחילת התהליך
[veritas_test_link] וריטאס לינק
[process_step] שלב בתהליך
[waive_reason] סיבת פרישה`;


export const EMAIL_CONTENT_INTERVIEWER = `מראיין`;


export const SMS_CONTENT = `[interviewer] = מראיין
[online_form_link] = שאלון מקוון
[veritas_test_link]  = veritas link
[candidate_name] = שם 
[candidate_status] = סטטוס
[ec_event_address] = כתובת אירוע
[ec_event_start_time] = תחילת זמן אירוע
[organization_name] = שם ארגון
[position] = משרה
[process_start_date] = תאריך התחלה
[process_step] = שלב בתהליך`;


