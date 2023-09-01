import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button, Dialog, Portal, Provider, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertStartDialogue = ({ visible, setVisible }: Props) => {
  const hideDialog = () => setVisible(false);
  const [isAcceptEnabled, setIsAcceptEnabled] = React.useState(false);
  const navigation = useNavigation();
  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ marginTop: -150 }}>
          <Dialog.Title style={{ fontSize: 18 }}>Safety Notice and Agreement</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView
              onScroll={({ nativeEvent }) => {
                const isAtBottom =
                  nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height;
                setIsAcceptEnabled(isAtBottom);
              }}
              scrollEventThrottle={16}
              contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
              style={{ height: 275 }}
            >
              <Text className="block">
                Interacting with a wild animal carries risks both for yourself and the animal's well-being. Prior to
                handling, transporting, or disturbing a wild animal, we strongly advise exercising caution, using sound
                judgment, and seeking guidance from experts who may respond to your alert. {"\n"}
                Scroll to the bottom to proceed.
              </Text>
              <Text className="block mt-4">
                End User License Agreement{"\n"}
                Last updated August 08, 2023{"\n"}
                WilLifeAlerts is licensed to You (End-User) by Plugajawea Productions LLC (Licensor), for use only under
                the terms of this license Agreement.{"\n"}
                By downloading the Licensed Application from Apples software distribution platform (App Store) and
                Googles software distribution platform (Play Store), and any update thereto (as permitted by this
                License Agreement), You indicate that you agree to be bound by all of the terms and conditions of this
                License Agreement, and that You accept this License Agreement. App Store and Play Store are referred to
                in this License Agreement as Services.{"\n"}
                The parties of this License Agreement acknowledge that the Services are not a Party to this License
                Agreement and are not bound by any provisions or obligations with regard to the Licensed Application,
                such as warranty, liability, maintenance and support thereof. Plugajawea Productions LLC, not the
                Services, is solely responsible for the Licensed Application and the content thereof.{"\n"}
                This License Agreement may not provide for usage rules for the Licensed Application that are in conflict
                with the latest Apple Media Services Terms and Conditions and Google Play Terms of Service (Usage
                Rules). Plugajawea Productions, LLC acknowledges that it had the opportunity to review the Usage Rules
                and this License Agreement is not conflicting with them. WildLifeAlerts when purchased or downloaded
                through the Services, is licensed to You for use only under the terms of this License Agreement. The
                Licensor reserves all rights not expressly granted to You. WildLifeAlerts is to be used on devices that
                operate with Apples operating systems (iOS) or Googles operating system (Android).{"\n"}
                The Application{"\n"}
                WildLifeAlerts (Licensed Application) is a piece of software created to facilitate the sharing of
                information, optional images, and the location of an injured or distressed animal that may need
                rehabilitation or rescue and is customized for iOS and Android mobile devices (Devices). It is used to
                provide the general public the option to post an alert regarding an animal in need which is shared via
                notification to users nearby who are registered and authenticated in the app. The Licensed Application
                is not tailored to comply with industry-specific regulations (Health Insurance Portability and
                AccountabilityAct (HIPAA, federal Information SecurityManagementAct (FISMA), etc., so if your
                interactions would be subjected to such laws, you may not use this Licensed Application. You may not use
                the Licensed Application in a way that would violate the Gramm-Leach-Billey Act (GLBA).{"\n"}
                2. Scope of License{"\n"}
                2.1 You may not share or make the Licensed Application available to third parties unless to the degree
                allowed by the Usage Rules, and with Plugajawea Productions, LLCs prior written consent), sell, rent,
                lend, lease or otherwise redistribute the Licensed Application.{"\n"}
                2.2 You may not reverse engineer, translate, disassemble, integrate, decompile, remove, modifv, combine,
                create derivative works or updates of, adapt, or attempt to derive the source code of the
                LicensedApplication, or any part thereof (except with Plugaiawea Productions LLCs prior written
                consent).{"\n"}
                2.3 You may not copy (excluding when expressly authorized by this license and the Usage Rules) or alter
                the Licensed Application or portions thereof. You may create and store copies only on devices that You
                own or control for backup keeping under th terms of this license, the usage rules, and any other terms
                and conditions that apply to the device or software used. You may not remove any intellectual property
                notices. You acknowledge that no unauthorized third parties may gain access to these copies at any time.
                If you sell your Devices to a third party, you must remove the Licensed Application from the Devices
                before doing so.{"\n"}
                2.4 Violations of the obligations mentioned above, as well as the attempt of such infringement, may be
                subject to prosecution and damages.{"\n"}
                2.5 Licensor reserves the right to modify the terms and conditions of licensing.{"\n"}
                2.6 Nothing in this license should be interpreted to restrict third-party terms. When using the Licensed
                Application, You must ensure that You comply with applicable third-party terms and conditions.{"\n"}
                3. Technical Requirements{"\n"}
                3.1 You acknowledge that it is Your responsibility to confirm and determine that the app end-user device
                on which You intend to use the Licensed Application satisfies the technical specifications mentioned
                above.{"\n"}
                3.2 Licensor reserves the right to modify the technical specifications as it sees appropriate at any
                time.{"\n"}
                4. Maintenance and Support{"\n"}
                4.1 The Licensor is solely responsible for providing any maintenance and support services for this
                Licensed Application. You can reach the Licensor at the email address listed in the App Store or Play
                Store Overview for this Licensed Application.{"\n"}
                4.2 Plugajawea Productions, LLC and the End-User acknowledge that the Services have no obligation
                whatsoever to furnish any maintenance and support services with respect to the Licensed Application.
                {"\n"}
                5. Use of Data{"\n"}
                You acknowledge that Licensor will be able to access and adjust Your downloaded Licensed Application
                content and Your personal information, and that Licensors use of such material and information is
                subject ot Your legal agreements with Licensor and Licensors privacy policy, which can be accessed by
                Navigating to the About screen, and tapping the link to Privacy Policy and Terms of Use.{"\n"}
                You acknowledge that the Licensor may periodically collect and use technical data and related
                information about your device system, and application software, and peripherals, offer product support,
                facilitate the software updates. and for purposes of providing other services to you (if any) related to
                the Licensed Application. Licensor may also use this information to improve its products or to provide
                services or technologies to you, as long as it is in a form that does not personally identify you.{"\n"}
                6. User-Generated Contributions{"\n"}
                The LicensedApplication may invite you to chat, contribute to, or participate in blogs, message boards,
                online forums, and other functionality and may provide you with the opportunity to create, submit, post,
                display, transmit, perform, publish, distribute, or broadcast content and materials to us or in the
                Licensed Application, including but not limited to text writings, video, audio, photographs, graphics,
                comments, suggestions, or personal information or other material (collectively, “Contributions").
                Contributions may be viewable by other users of the Licensed Application. As such, any Contributions you
                transmit may be treated as non-confidential and non-proprietary. When you create or make available any
                Contributions, you thereby represent and warrant that: {"\n"}
                The creation, distribution, transmission, public display, or performance, and the accessing,
                downloading, or copying of your Contributions do not and will not infringe the proprietary rights.
                including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any
                third party.{"\n"}
                You are the creator and owner of or have the necessary licenses, rights, consents, releases, and
                permissions to use and to authorize us, the Licensed Application, and other users of the Licensed
                Application to use your Contributions in any manner contemplated by the Licensed Application and this
                License Agreement.{"\n"}
                You have the written consent, release, and/or permission of each and every identifiable individual
                person in your Contributions to use the name or likeness or each and every such identifiable individual
                person to enable inclusion and use of your Contributions in any manner contemplated by the Licensed
                Application and this License Agreement.{"\n"}
                Your Contributions are not false, inaccurate, or misleading.{"\n"}
                Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid
                schemes, chain letters, spam, mass mailings, or other forms of solicitation.{"\n"}
                Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous,
                or otherwise objectionable (as determined by us).{"\n"}
                Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.{"\n"}
                Your contributions are not used to harass or threaten (in the legal sense of those terms) any other
                person and to promote violence against a specific person or class of people.{"\n"}
                Your Contributions do not violate any applicable law, regulation, or rule.{"\n"}
                Your Contributions do not violate the privacy or publicity rights of any third party.{"\n"}
                Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended
                to protect the health or well-being of minors.{"\n"}
                Your contributions do not include any offensive comments that are connected to race, national origin,
                gender, or physical handicap.{"\n"}
                Your Contributions do not otherwise violate, or link to material that violates, any provision of this
                License Agreement, or any applicable law or regulation.{"\n"}
                Any use of the Licensed Application in violation of the foregoing violates this License Agreement and
                may result in, among other things, termination or suspension of your rights to use the Licensed
                Application.{"\n"}
                7. Contribution License{"\n"}
                By posting your Contributions to any part of the Licensed Application or making Contributions accessible
                to the Licensed Application by linking your account from the Licensed Application to any of your social
                networking accounts, you automatically grant, and you represent and warrant that you have the right to
                grant, to us an unrestricted, unlimited, irrevocable, perpetual non-exclusive, transferable,
                royalty-free, fully-paid, worldwide right, and license to host, use copy, reproduce, disclose, sell
                resell, publish, broad cast, retitle, archive, store, cache, publicly display, reformat, translate,
                transmit, excerpt (in whole or in part), and distribute such Contributions (including, without
                limitation, your image) for any purpose, commercial advertising, or otherwise, and to prepare derivative
                works of, or incorporate in other works, such as contributions, and grant and authorize sub-licenses of
                the foregoing. The use and distribution may occur in any media formats and through any media channels.
                {"\n"}
                This license will apply to any form, media, or technology now known or hereafter developed, and includes
                our use of your name, organization name, and franchise name, as applicable, and any of the trademarks,
                service marks, trade names, logos, and personal and commercial images you provide.You waive all moral
                rights in your contributions, and you warrant that moral rights have not otherwise been asserted in your
                Contributions.{"\n"}
                We do not assert any ownership over your Contributions. You retain full ownership of all of your
                Contributions and any intellectual property rights or other proprietary rights associated with your
                Contributions. We are not liable for any statements or representations in your Contributions provided by
                you in any area in the Licensed Application. You are solely responsible for you Contributions to the
                Licensed Application and you expressly agree to exonerate us from any and all responsibility and to
                refrain from any legal action against us regarding your Contributions.{"\n"}
                We have the right, in our sole and absolute discretion, (1) to edit, redact, or otherwise change any
                Contributions; (2) to recategorize any contributions to place them in more appropriate locations in the
                Licensed Application; and (3) to prescreen or delete any Contributions at any time and for any reason,
                without notice. We have no obligation to monitor your Contributions.{"\n"}
                8. Liability{"\n"}
                8.1 Licensor takes no accountability or responsibility for any damages caused due to a breach of duties
                according to Section 2 of this License Agreement. You are aware that in case of alterations or
                manipulations of the Licensed Application, You will not have access to the Licensed Application.{"\n"}
                8.2 Licensor takes no accountability and responsibility in case of Injury or harm sustained by You or
                caused by You in the act of responding to an alert posted in the app.{"\n"}
                9. Warranty{"\n"}
                9.1 Licensor warrants that the Licensed Application is free of spyware, Trojan horses, viruses, or any
                other malware at the time of Your download. Licensor warrants that the Licensed Application works as
                described in the documentation.{"\n"}
                9.2 No warranty is provided for the Licensed Application that is not executable on the device that has
                been unauthorizedly modified, handled inappropriately or culpably, combined or installed with
                inappropriate hardware or software, used with inappropriate accessories, regardless if by Yourself or by
                third parties, or if there are any other reasons outside of Plugajawea Productions, LLCs sphere of
                influence that affect the executability of the Licensed Application. {"\n"}
                9.3 You are required to inspect the Licensed Application immediately after installing it and notify
                Plugaiawea Productions LLC about issues discovered without delay by email provided in Contact
                Information. The defect report will be taken into consideration and further investigated if it has been
                emailed within a period of ninety (90) days after discovery.{"\n"}
                9.4 If we confirm that the Licensed Application is defective. Plugaiawea Productions. LLC reserves a
                choice to remedy the situation either by means of solving the defect or substitute delivery.{"\n"}
                9.5 In the event of any failure of the Licensed Application to conform to any applicable warranty You
                may notify the Services Store Operator. The Services Operator will have no other warranty obligation
                whatsoever with respect to the Licensed Application, and any other losses, claims damages, liabilities,
                expenses, and costs attributable to any negligence to adhere to any warranty.{"\n"}
                9.6 If the user is an entrepreneur, any claim based on faults expires after a statutory period of
                limitation amounting to twelve (12) months after the Licensed Application was made available to the
                user. The statutory periods of limitation vine by law apply for users who are consumers.{"\n"}
                10. Product Claims{"\n"}
                Plugajawea Productions LLC and the End-User that Plugajawea Productions LLC, and not the Services, is
                responsible for addressing any claims of the End-User or any third party relating to the Licensed
                Application, including, but not limited to: {"\n"}
                product liability claims;{"\n"}
                Any claim that the Licensed Application fails to conform to any applicable legal or regulatory
                requirement; and{"\n"}
                Claims arising under consumer protection, privacy, or similar legislation, including in connection with
                Your Licensed Application’s use of the HealthKit and HomeKit.{"\n"}
                11. Legal Compliance{"\n"}
                You represent and warrant that You are not located in a country that is subject to a U S Government
                embargo, or that has been designated by the US Government as a "terrorist supporting" country: and that
                You are not listed on any US Government list of prohibited or restricted parties.{"\n"}
                12. Contact Information{"\n"}
                For general inquiries, complaints, questions or claims concerning the Licensed Application, please
                contact: wildlifealertusa+support@gmail.com{"\n"}
                13. Termination{"\n"}
                The license is valid until terminated by Plugajawea Productions, LC or byYou. Your rights under this
                license will terminate automatically and without notice from Plugajawea Productions, LLC if You fail to
                adhere to any term(s) of this license.{"\n"}
                14. Third-party terms of agreements and beneficiary{"\n"}
                Plugaiawea Productions LLC represents and warrants that Plugaiawea Productions LLC will comply with
                applicable third-party terms of agreement using Licensed Application.{"\n"}
                In Accordance with Section 9 of the"Instructions for Minimum Terms of Developers End-User License
                Agreement." both Apple and Google and their subsidiaries shall be third-party beneficiaries of this End
                User License Agreement and upon Your acceptance of the terms and conditions of this License Agreement,
                both Apple and Google will have the right (and will be deemed to have accepted the right) to enforce
                this End User License Agreement against You as a third-party beneficiary thereof.{"\n"}
                15. Intellectual Property Rights{"\n"}
                Plugajawea Productions, LLC and the End-User acknowledge that, in the event of any third-party claim
                that the Licensed Application or the End-Users possession and use of that Licensed Application infringes
                on the third partys intellectual property rights, Plugajawea Productions, LLC, and not the Services,
                will be solely responsible for the investigation, defense, settlement, and discharge or any such
                intellectual property infringement claims.{"\n"}
                16. Applicable Law{"\n"}
                This License Agreement is governed by the laws of the State of New Mexico excluding its conflicts of law
                rules.{"\n"}
                17. Miscellaneous{"\n"}
                17.1 If any of the terms of this agreement should be or become invalid, the validity of the remaining
                provisions shall not be affected. Invalid terms will be replaced by valid ones formulated in a way that
                will achieve the primary purpose.{"\n"}
                17.2 Collateral agreements, changes and amendments are only valid if Laid down in writing. The preceding
                clause can only be waived in writing.{"\n"}
              </Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <View className="flex-1 align-middle justify-center">
              <View className="flex-row items-center justify-center">
                <Button className=" text-blue-800 px-5 " onPress={navigation.goBack}>
                  Go Back
                </Button>
                <Button className=" text-blue-800 px-5 " onPress={hideDialog}>
                  Accept
                </Button>
              </View>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default AlertStartDialogue;

/* disabled={!isAcceptEnabled} */
