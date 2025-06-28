# كورة لايف - منصة البث المباشر للكرة العربية

## نشر مجاني للموقع

### الخيارات المجانية المتاحة:

#### 1. **Vercel** (الأفضل للمواقع)
```bash
# تثبيت Vercel CLI
npm i -g vercel

# في مجلد المشروع
vercel --prod
```
- رابط مجاني: `yourproject.vercel.app`
- مناسب للمواقع الثابتة والديناميكية
- دعم قواعد البيانات مجاني

#### 2. **Netlify**
```bash
# تثبيت Netlify CLI
npm i -g netlify-cli

# نشر الموقع
netlify deploy --prod --dir=dist
```
- رابط مجاني: `yourproject.netlify.app`
- دعم النماذج والوظائف

#### 3. **Railway**
```bash
# ربط مع Railway
railway login
railway init
railway up
```
- رابط مجاني: `yourproject.railway.app`
- دعم قواعد البيانات PostgreSQL مجاني

#### 4. **Render**
- ارفع الكود على GitHub
- اربط مع Render.com
- نشر مجاني مع رابط: `yourproject.onrender.com`

### خطوات النشر السريع:

#### للنشر على Vercel:
1. انشئ حساب على vercel.com
2. اربط مع GitHub
3. ارفع المشروع واختر Auto Deploy

#### إعداد قاعدة البيانات المجانية:
- **Neon Database** (PostgreSQL مجاني)
- **PlanetScale** (MySQL مجاني)
- **Supabase** (PostgreSQL مع API مجاني)

### البدائل المحلية:
```bash
# تشغيل محلي
npm run dev

# استخدام ngrok للوصول الخارجي
npm i -g ngrok
ngrok http 5000
```

## الميزات الحالية:
- ✅ بث مباشر للمباريات
- ✅ تحديثات فورية عبر WebSocket
- ✅ لوحة تحكم إدارية
- ✅ إحصائيات متقدمة
- ✅ دعم العربية RTL
- ✅ تصميم متجاوب

## للاستخدام:
1. انسخ المشروع لحسابك
2. اختر منصة نشر مجانية
3. اربط قاعدة البيانات
4. انشر الموقع

جميع هذه الخيارات مجانية بالكامل ولا تتطلب دفع أي رسوم.