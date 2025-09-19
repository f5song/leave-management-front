import { z } from "zod"

export const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'กรุณากรอกชื่อจริง')
    .regex(/^[ก-๙a-zA-Z\s]+$/, 'ชื่อจริงต้องเป็นตัวอักษรเท่านั้น'),
  lastName: z
    .string()
    .trim()
    .min(1, 'กรุณากรอกนามสกุล')
    .regex(/^[ก-๙a-zA-Z\s]+$/, 'นามสกุลต้องเป็นตัวอักษรเท่านั้น'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
  departmentId: z.string().trim().min(1, 'เลือกแผนก'),
  jobTitleId: z.string().trim().min(1, 'เลือกตำแหน่ง'),
  nickName: z
    .string()
    .trim()
    .min(1, 'กรอกชื่อเล่น')
    .regex(/^[ก-๙a-zA-Z\s]+$/, 'ชื่อเล่นต้องเป็นตัวอักษรเท่านั้น'),
  birthDate: z.date().optional(),
  avatar: z.any().optional(),
})

export type ProfileData = z.infer<typeof profileSchema>


