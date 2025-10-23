Öncelikle Insider’a ve Software Developer pozisyonumuza gösterdiğin ilgi için teşekkür ederiz! :purple_heart: Bu aşamada senden, JavaScript becerilerini hem görsel hem de mantıksal açıdan değerlendirebilmemiz için hazırlanmış yeni projemiz olan “Seesaw Simulation” çalışmasını tamamlamanı rica ediyoruz.

Gönderilen PDF dosyasında proje detaylarını, teknik gereksinimleri ve teslim kurallarını bulabilirsin.Aşağıda senin için özetledik
 
:jigsaw: Proje Özeti

Bu görevde, Pure JavaScript kullanarak kullanıcı etkileşimiyle çalışan bir seesaw (tahterevalli) simülasyonu geliştirmeni bekliyoruz. Kullanıcı her tıklamada farklı ağırlıklarda objeler oluşturacak, tahterevalli gerçek fizik kurallarıyla dengelenecek ve görsel olarak eğilecektir. Hedefimiz, mantıksal düşünme, animasyon ve yapılandırılmış kod geliştirme becerilerini gözlemlemek.
 
✍️ Task Kuralları
Projeyi tamamlamak için 72 saat süren bulunuyor.
Tüm detaylar ve kurallar ekli PDF dosyasında yer almaktadır.
Kodlamada yalnızca HTML, CSS ve pure JavaScript kullanılabilir — framework veya kütüphane kullanımı kabul edilmemektedir.
GitHub linkini tamamlandıktan sonra aşağıdaki adreslere e-posta olarak iletmelisin: kubra.karasu@useinsider.com & zeynep.cetinkaya@useinsider.com
Repo public olmalı ve dosya adlandırmasında ad/soyad kullanmalısın. (Proje linkini adlandırırken Insider ismini kullanmamaya hassasiyet göstermeni rica edeceğiz.)
Task değerlendirmesinde:
Doğru fizik hesaplamaları (torque & denge)
Görsel akıcılık ve responsive davranış
Clean kod yapısı
Adım adım commit geçmişi
README içeriği ve açıklamalar
Kısa demo videosu (max. 5 dk)  önemli kriterler arasında yer alacaktır.

GOAL
Create a visual seesaw simulation in pure JavaScript where random-weight objects
can be dropped by clicking directly on the seesaw.
Each click adds a new object with a random weight (1–10 kg) at the clicked position,
and the seesaw tilts based on real physics logic.
This task tests your ability to combine user interaction, logical simulation, animation,
and clean JavaScript structure.
Preview example: https://seesaw.samet-sevindi.workers.dev/

SCENARIO
You are simulating a playground seesaw — a plank balanced on a pivot in the center.
Users can interact with it by clicking anywhere along the seesaw plank to drop new
objects.
Each object has a random weight (1–10 kg) and appears at the clicked position.
The simulation should visually show how the seesaw tilts and balances based on all
objects currently placed.

REQUIREMENTS
1. Core Logic
● The seesaw plank has a fixed length (for example 400px).
● The pivot (fulcrum) is exactly in the center.
When the user clicks on the seesaw plank:
○ A new object (1–10 kg) appears at that position.
○ The clicked position determines which side (left or right) and the
distance from the pivot.
○ The seesaw recalculates its tilt based on all placed objects.
● Compute torque for each side: torque = sum(weight × distance)
● The seesaw tilts proportionally to the torque difference, capped at ±30
degrees. Example:
const angle = Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
● Store latest state of seesaw in local storage to not lose the progression when
page is refreshed.

2. Visualization
● Use only pure JavaScript, HTML, and CSS.
● No external frameworks or libraries are allowed (no React, p5.js, GSAP, etc.).
● The visualization should clearly show:
○ The seesaw plank
○ The pivot point
○ Each dropped object (e.g., colored circles or boxes)
○ The tilt animation when new objects are added
● The seesaw should tilt smoothly, not instantly.
● The clickable area should be limited to the seesaw plank itself, not the
background.
3. Behavior
● Objects appear exactly where the user clicks on the seesaw.
● After each new object is dropped, the seesaw rebalances smoothly based on
the new torque calculation.
● Display the total weight on each side somewhere in the UI.
● The seesaw should respond continuously to new clicks and remain in motion
as the balance changes.


BONUS IDEAS
If you finish early, you are encouraged to extend the project in creative ways, as
long as the core functionality remains intact. Here are a few example ideas:
● A reset or pause button.
● A small weight indicator showing the value of each dropped object.
● A visual scale or grid to show distance from pivot.
● Subtle animations or sound effects.

SUBMISSION REQUIREMENTS
1. The project must be uploaded to a public GitHub repository.
2. The final deployed result must be viewable via GitHub Pages (for example
https://username.github.io/seesaw-simulation).
3. The repository must contain multiple small commits representing each minor
implementation step. Large single commits that contain the entire solution
will not be accepted.
4. Only pure JavaScript, HTML, and CSS should be used. No libraries or
frameworks.
5. Include a README file that explains:
○ Your thought process and design decisions
○ Any trade-offs or limitations you faced
○ Which parts (if any) were assisted by AI
6. Record a short video (maximum 5 minutes) showing your simulation and
explaining the implementation and logic. Attach the video to email as well.
(The video can be in English or Turkish. English explanations are considered a
plus.)
7. All information required to complete this challenge is provided in this
document. No questions, clarifications, or additional instructions will be
given. Your implementation should rely solely on your understanding of the
description below.