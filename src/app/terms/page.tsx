'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            asChild
            variant="ghost"
            className="mb-6 -ml-4"
          >
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              홈으로 돌아가기
            </Link>
          </Button>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              서비스 이용약관
            </h1>
            <p className="text-gray-500 mb-8">시행일: 2025년 11월 5일</p>

            <div className="prose prose-gray max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제1조 (목적)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  이 약관은 hobbyfind(이하 "회사"라 함)이 제공하는 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제2조 (정의)
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                </p>
                <ul className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>"서비스"란 회사가 제공하는 모든 서비스를 의미합니다.</li>
                  <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                  <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                  <li>"비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                  <li>"콘텐츠"란 회사 또는 이용자가 서비스 상에 게시한 모든 글, 사진, 동영상, 첨부파일, 링크 등을 말합니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제3조 (약관 외 준칙)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  이 약관에서 정하지 아니한 사항은 전기통신사업법, 전자상거래 등에서의 소비자보호에 관한 법률, 개인정보 보호법 등 관련 법령의 규정과 일반적인 상관례에 의합니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제4조 (약관의 효력과 변경)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.</li>
                  <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.</li>
                  <li>회사가 약관을 변경할 경우에는 적용일자 및 변경사유를 명시하여 현행 약관과 함께 서비스 내 공지사항에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다.</li>
                  <li>이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있습니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제5조 (이용계약의 체결)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>이용계약은 이용자가 이 약관에 동의하고 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 가입을 신청하고, 회사가 이를 승낙함으로써 체결됩니다.</li>
                  <li>회사는 이용신청 요건을 충족하는 모든 이용자의 신청을 승낙합니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제6조 (회원정보의 변경)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회원은 개인정보 관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다.</li>
                  <li>회원은 회원가입 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 또는 기타 방법으로 회사에 그 변경사항을 알려야 합니다.</li>
                  <li>변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는 책임을 지지 않습니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제7조 (개인정보보호 의무)
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제8조 (회원의 아이디 및 비밀번호의 관리에 대한 의무)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회원의 아이디와 비밀번호에 관한 관리책임은 회원에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.</li>
                  <li>회사는 회원의 아이디가 개인정보 유출 우려가 있거나, 반사회적 또는 미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인할 우려가 있는 경우, 해당 아이디의 이용을 제한할 수 있습니다.</li>
                  <li>회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제9조 (이용자의 의무)
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  이용자는 다음 행위를 하여서는 안 됩니다.
                </p>
                <ul className="list-decimal list-inside text-gray-700 space-y-1">
                  <li>신청 또는 변경 시 허위 내용의 등록</li>
                  <li>타인의 정보 도용</li>
                  <li>회사가 게시한 정보의 변경</li>
                  <li>회사와 기타 제3자의 저작권 등 지식재산권에 대한 침해</li>
                  <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제10조 (서비스의 제공 및 변경)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회사는 테스트를 통한 취미추천 서비스를 제공합니다.</li>
                  <li>회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.</li>
                  <li>회사는 이용자에게 서비스를 제공함에 있어 관련 법령, 약관, 운영정책 및 공지사항 등에서 정한 바에 따라 무료로 서비스를 제공합니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제11조 (서비스의 중단)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                  <li>회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제12조 (회원탈퇴 및 자격 상실 등)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를 처리합니다.</li>
                  <li>회원이 약관을 위반하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.</li>
                  <li>회사가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제13조 (책임제한)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                  <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                  <li>회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  제14조 (준거법 및 재판관할)
                </h2>
                <ul className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>회사와 회원 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
                  <li>회사와 회원 간 발생한 분쟁에 관한 소송은 회사 소재지 관할법원의 관할로 합니다.</li>
                </ul>
              </section>

              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  부칙
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  이 약관은 2025년 11월 5일부터 시행합니다.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

