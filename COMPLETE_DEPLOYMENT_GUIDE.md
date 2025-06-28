# دليل النشر الكامل - كورة لايف

## الطريقة 1: رفع مباشر على GitHub

### الخطوة الأولى: إنشاء repository
1. اذهب إلى github.com
2. اضغط "Sign up" إذا لم يكن لديك حساب
3. اضغط الزر الأخضر "New" أو "Create repository"
4. اكتب اسم المشروع: `kooralive-streaming`
5. اختر "Public"
6. اضغط "Create repository"

### الخطوة الثانية: رفع الملفات
#### الطريقة أ) استخدام Terminal:
```bash
# في Shell/Terminal الخاص بـ Replit
git remote add origin https://github.com/YOUR_USERNAME/kooralive-streaming.git
git branch -M main
git push -u origin main
```

#### الطريقة ب) رفع يدوي:
1. في صفحة repository الجديد اضغط "uploading an existing file"
2. اسحب وأفلت هذه المجلدات من Replit:
   - client/
   - server/
   - shared/
3. ارفع هذه الملفات:
   - package.json
   - vercel.json
   - tsconfig.json
   - vite.config.ts
   - tailwind.config.ts
   - drizzle.config.ts

## الطريقة 2: النشر على Vercel

### الخطوة الأولى: إنشاء حساب
1. اذهب إلى vercel.com
2. اضغط "Continue with GitHub"
3. امنح الصلاحيات المطلوبة

### الخطوة الثانية: Import المشروع
1. اضغط "Add New..." → "Project"
2. اختر `kooralive-streaming` من القائمة
3. اضغط "Import"
4. اضغط "Deploy" (سيتم الكشف عن الإعدادات تلقائياً)

### الخطوة الثالثة: إعداد قاعدة البيانات
1. اذهب إلى neon.tech
2. اضغط "Get started for free"
3. سجل باستخدام GitHub
4. اضغط "Create a database"
5. اختر اسم: `kooralive`
6. اختر المنطقة: "AWS US East"
7. اضغط "Create database"
8. انسخ "Connection string"

### الخطوة الرابعة: ربط قاعدة البيانات
1. ارجع إلى Vercel Dashboard
2. اضغط على مشروعك
3. اذهب إلى "Settings" → "Environment Variables"
4. اضغط "Add New"
5. اكتب:
   - Key: `DATABASE_URL`
   - Value: [الصق connection string من Neon]
6. اضغط "Save"

### الخطوة الخامسة: Redeploy
1. اذهب إلى "Deployments"
2. اضغط على أحدث deployment
3. اضغط "Redeploy"

## النتيجة النهائية:
- الموقع متاح على: `https://yourproject.vercel.app`
- البث المباشر يعمل
- تحديثات فورية للنتائج
- لوحة الإدارة على: `/admin`
- دعم كامل للعربية

## المميزات المتاحة:
✓ بث مباشر للمباريات
✓ تحديثات النتائج الفورية
✓ لوحة تحكم إدارية
✓ إحصائيات مشاهدة متقدمة
✓ دعم أجهزة متعددة
✓ واجهة عربية كاملة

## استكشاف الأخطاء:
- إذا فشل البناء: تحقق من Vercel Function Logs
- إذا لم تعمل قاعدة البيانات: تأكد من DATABASE_URL
- للدعم التقني: docs.vercel.com

التكلفة الإجمالية: 0 ريال