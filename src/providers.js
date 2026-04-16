const providers = [
  {
    id: "beenverified",
    name: "BeenVerified",
    tags: ["email-confirmation"],
    website: "https://www.beenverified.com/",
    optOutUrl: "https://www.beenverified.com/app/optout/search",
    approach: "form-url-email-confirmation",
    notes: [
      "One opt-out per email address may apply.",
      "Owns PeopleLooker and PeopleSmart."
    ]
  },
  {
    id: "checkpeople",
    name: "CheckPeople",
    tags: ["right-to-know", "legal-name", "birthdate"],
    website: "https://www.checkpeople.com/",
    optOutUrl: "https://www.checkpeople.com/privacy-rights",
    approach: "manual-guided",
    notes: ["Request data under Right to Know first, then opt out if listed."]
  },
  {
    id: "clustrmaps",
    name: "ClustrMaps",
    tags: ["search-then-remove"],
    website: "https://clustrmaps.com/",
    optOutUrl: "https://clustrmaps.com/bl/opt-out",
    approach: "search-and-remove",
    notes: ["Select associated items to remove."]
  },
  {
    id: "intelius",
    name: "Intelius",
    tags: ["email-option", "phone-option", "form-option"],
    website: "https://www.intelius.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided",
    notes: [
      "Alternative contact: support@mailer.intelius.com or 1-888-245-1655.",
      "May request additional identifying details if account not found."
    ]
  },
  {
    id: "mylife",
    name: "MyLife",
    tags: ["email-option", "phone-option"],
    website: "https://www.mylife.com/",
    optOutUrl: "https://www.mylife.com/ccpa/index.pubview",
    approach: "manual-guided",
    notes: [
      "May ask for account/login or phone verification.",
      "Email options include privacy@mylife.com."
    ]
  },
  {
    id: "nuwber",
    name: "Nuwber",
    tags: ["search-result-url", "email-fallback"],
    website: "https://nuwber.com/",
    optOutUrl: "https://nuwber.com/removal/link",
    approach: "form-url-email-confirmation",
    notes: ["If URL flow fails, email support@nuwber.com with screenshot."]
  },
  {
    id: "publicdatausa",
    name: "PublicDataUSA",
    tags: ["email-confirmation"],
    website: "https://www.publicdatausa.com/",
    optOutUrl: "https://www.publicdatausa.com/opt-out",
    approach: "manual-guided",
    notes: ["Requires recognized email providers for verification."]
  },
  {
    id: "radaris",
    name: "Radaris",
    tags: ["form-or-email"],
    website: "https://radaris.com/",
    optOutUrl: "https://radaris.com/control/privacy",
    approach: "manual-guided",
    notes: ["If no profile button, email customer-service@radaris.com."]
  },
  {
    id: "smartbackgroundchecks",
    name: "SmartBackgroundChecks",
    tags: ["search-then-remove"],
    website: "https://www.smartbackgroundchecks.com/",
    optOutUrl: "https://www.smartbackgroundchecks.com/opt-out",
    approach: "manual-guided",
    notes: ["Removal may also propagate to PeopleFinders in some cases."]
  },
  {
    id: "spokeo",
    name: "Spokeo",
    tags: ["url-and-email", "email-confirmation"],
    website: "https://www.spokeo.com/",
    optOutUrl: "https://www.spokeo.com/optout",
    approach: "form-url-email-confirmation",
    notes: ["Use profile URL + email on opt-out form."]
  },
  {
    id: "thatsthem",
    name: "That's Them",
    tags: ["search-then-optout"],
    website: "https://thatsthem.com/",
    optOutUrl: "https://thatsthem.com/optout",
    approach: "manual-guided",
    notes: ["Avoid upsell links; submit only site-native opt-out flow."]
  },
  {
    id: "whitepages",
    name: "Whitepages",
    tags: ["phone-verification", "call-code"],
    website: "https://www.whitepages.com/",
    optOutUrl: "https://www.whitepages.com/suppression_requests",
    approach: "manual-guided",
    notes: ["May require phone call code and premium listing re-check."]
  },
  {
    id: "acxiom",
    name: "Acxiom",
    tags: ["regional-portal", "manual"],
    website: "https://www.acxiom.com/",
    optOutUrl: "https://isapps.acxiom.com/optout/optout.aspx",
    approach: "manual-guided",
    notes: ["Regional portals vary by country; phone option also exists."]
  },
  {
    id: "advancedbackgroundchecks",
    name: "Advanced Background Checks",
    tags: ["search-then-remove"],
    website: "https://www.advancedbackgroundchecks.com/",
    optOutUrl: "https://www.advancedbackgroundchecks.com/removal",
    approach: "search-and-remove"
  },
  {
    id: "ancestry",
    name: "Ancestry.com",
    tags: ["email-request", "manual"],
    website: "https://www.ancestry.com/",
    optOutUrl: "https://support.ancestry.com/s/article/Requesting-Content-Removal",
    approach: "manual-guided"
  },
  {
    id: "familytreenow",
    name: "FamilyTreeNow",
    tags: ["search-then-remove"],
    website: "https://www.familytreenow.com/",
    optOutUrl: "https://www.familytreenow.com/optout",
    approach: "search-and-remove"
  },
  {
    id: "fastpeoplesearch",
    name: "FastPeopleSearch",
    tags: ["captcha-possible"],
    website: "https://www.fastpeoplesearch.com/",
    optOutUrl: "https://www.fastpeoplesearch.com/removal",
    approach: "manual-guided"
  },
  {
    id: "usphonebook",
    name: "USPhoneBook",
    tags: ["search-and-optout"],
    website: "https://www.usphonebook.com/",
    optOutUrl: "https://www.usphonebook.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "cyberbackgroundchecks",
    name: "Cyber Background Checks",
    tags: ["search-and-optout"],
    website: "https://www.cyberbackgroundchecks.com/",
    optOutUrl: "https://www.cyberbackgroundchecks.com/removal",
    approach: "manual-guided"
  },
  {
    id: "infotracer",
    name: "InfoTracer",
    tags: ["form", "mail-fax-option"],
    website: "https://infotracer.com/",
    optOutUrl: "https://infotracer.com/optout/",
    approach: "manual-guided"
  },
  {
    id: "neighborreport",
    name: "NeighborReport",
    tags: ["email-confirmation"],
    website: "https://neighbor.report/",
    optOutUrl: "https://neighbor.report/optout",
    approach: "manual-guided"
  },
  {
    id: "peoplebyname",
    name: "PeopleByName",
    tags: ["record-by-record"],
    website: "https://www.peoplebyname.com/",
    optOutUrl: "https://www.peoplebyname.com/optout",
    approach: "manual-guided"
  },
  {
    id: "peoplesearchnow",
    name: "PeopleSearchNow",
    tags: ["search-and-optout"],
    website: "https://www.peoplesearchnow.com/",
    optOutUrl: "https://www.peoplesearchnow.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "privateeye",
    name: "PrivateEye",
    tags: ["email-link-form"],
    website: "https://www.privateeye.com/",
    optOutUrl: "https://www.privateeye.com/optout",
    approach: "manual-guided"
  },
  {
    id: "privaterecords",
    name: "PrivateRecords",
    tags: ["search-and-optout"],
    website: "https://www.privaterecords.net/",
    optOutUrl: "https://www.privaterecords.net/optout",
    approach: "manual-guided"
  },
  {
    id: "propertyrecs",
    name: "PropertyRecs",
    tags: ["search-and-optout"],
    website: "https://propertyrecs.com/",
    optOutUrl: "https://propertyrecs.com/optout",
    approach: "manual-guided"
  },
  {
    id: "rehold",
    name: "Rehold",
    tags: ["captcha-possible"],
    website: "https://rehold.com/",
    optOutUrl: "https://rehold.com/",
    approach: "manual-guided"
  },
  {
    id: "searchpeoplefree",
    name: "SearchPeopleFree",
    tags: ["multi-search"],
    website: "https://www.searchpeoplefree.com/",
    optOutUrl: "https://www.searchpeoplefree.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "searchquarry",
    name: "SearchQuarry",
    tags: ["email-confirmation"],
    website: "https://www.searchquarry.com/",
    optOutUrl: "https://www.searchquarry.com/optout",
    approach: "manual-guided"
  },
  {
    id: "socialcatfish",
    name: "Social Catfish",
    tags: ["url-batch"],
    website: "https://socialcatfish.com/",
    optOutUrl: "https://socialcatfish.com/opt-out/",
    approach: "manual-guided"
  },
  {
    id: "spyfly",
    name: "SpyFly",
    tags: ["form-or-email"],
    website: "https://www.spyfly.com/",
    optOutUrl: "https://www.spyfly.com/optout",
    approach: "manual-guided"
  },
  {
    id: "truepeoplesearch",
    name: "TruePeopleSearch",
    tags: ["captcha-heavy"],
    website: "https://www.truepeoplesearch.com/",
    optOutUrl: "https://www.truepeoplesearch.com/removal",
    approach: "manual-guided"
  },
  {
    id: "truepeoplesearchnet",
    name: "TruePeopleSearch.net",
    tags: ["url-form"],
    website: "https://truepeoplesearch.net/",
    optOutUrl: "https://truepeoplesearch.net/remove",
    approach: "manual-guided"
  },
  {
    id: "unmask",
    name: "UnMask",
    tags: ["email-confirmation", "captcha-possible"],
    website: "https://www.unmask.com/",
    optOutUrl: "https://www.unmask.com/optout",
    approach: "manual-guided"
  },
  {
    id: "usapeoplesearch",
    name: "USA People Search",
    tags: ["search-then-remove"],
    website: "https://www.usapeoplesearch.com/",
    optOutUrl: "https://www.usapeoplesearch.com/optout",
    approach: "manual-guided"
  },
  {
    id: "usaofficial",
    name: "USA Official",
    tags: ["search-then-remove"],
    website: "https://www.usaofficial.com/",
    optOutUrl: "https://www.usaofficial.com/optout",
    approach: "manual-guided"
  },
  {
    id: "veripages",
    name: "Veripages",
    tags: ["url-form", "captcha", "email-confirmation"],
    website: "https://www.veripages.com/",
    optOutUrl: "https://www.veripages.com/optout",
    approach: "manual-guided"
  },
  {
    id: "voterrecords",
    name: "VoterRecords",
    tags: ["record-optout", "email-verify"],
    website: "https://voterrecords.com/",
    optOutUrl: "https://voterrecords.com/",
    approach: "manual-guided"
  },
  {
    id: "zoominfo",
    name: "ZoomInfo",
    tags: ["code-verification"],
    website: "https://www.zoominfo.com/",
    optOutUrl: "https://www.zoominfo.com/privacy-center/remove",
    approach: "manual-guided"
  },
  {
    id: "411-com",
    name: "411.com",
    tags: ["search-and-optout"],
    website: "https://www.411.com/",
    optOutUrl: "https://www.whitepages.com/suppression_requests",
    approach: "manual-guided"
  },
  {
    id: "411-locate",
    name: "411 Locate",
    tags: ["search-and-optout"],
    website: "https://www.411locate.com/",
    optOutUrl: "https://www.411locate.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "addresses-com",
    name: "Addresses.com",
    tags: ["manual"],
    website: "https://www.addresses.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  },
  {
    id: "anywho",
    name: "AnyWho",
    tags: ["manual"],
    website: "https://www.anywho.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  },
  {
    id: "arrestfacts",
    name: "ArrestFacts",
    tags: ["manual-guided"],
    website: "https://www.arrestfacts.com/",
    optOutUrl: "https://www.arrestfacts.com/contact",
    approach: "manual-guided"
  },
  {
    id: "arrests-org",
    name: "Arrests.org",
    tags: ["manual-guided"],
    website: "https://arrests.org/",
    optOutUrl: "https://arrests.org/contact/",
    approach: "manual-guided"
  },
  {
    id: "background-alert",
    name: "Background Alert",
    tags: ["manual-guided"],
    website: "https://backgroundalert.com/",
    optOutUrl: "https://backgroundalert.com/contact/",
    approach: "manual-guided"
  },
  {
    id: "backgroundcheck-run",
    name: "BackgroundCheck.Run",
    tags: ["search-and-optout"],
    website: "https://backgroundcheck.run/",
    optOutUrl: "https://backgroundcheck.run/optout",
    approach: "manual-guided"
  },
  {
    id: "blockshopper",
    name: "BlockShopper",
    tags: ["manual-guided"],
    website: "https://blockshopper.com/",
    optOutUrl: "https://blockshopper.com/contact/",
    approach: "manual-guided"
  },
  {
    id: "calltruth",
    name: "CallTruth",
    tags: ["manual-guided"],
    website: "https://www.calltruth.com/",
    optOutUrl: "https://www.calltruth.com/optout",
    approach: "manual-guided"
  },
  {
    id: "cocofinder",
    name: "CocoFinder",
    tags: ["search-and-optout"],
    website: "https://cocofinder.com/",
    optOutUrl: "https://cocofinder.com/removal",
    approach: "manual-guided"
  },
  {
    id: "corelogic",
    name: "CoreLogic",
    tags: ["manual"],
    website: "https://www.corelogic.com/",
    optOutUrl: "https://www.corelogic.com/privacy/",
    approach: "manual-guided"
  },
  {
    id: "credit-card-offers",
    name: "Credit Card Offers",
    tags: ["manual"],
    website: "https://www.optoutprescreen.com/",
    optOutUrl: "https://www.optoutprescreen.com/",
    approach: "manual-guided"
  },
  {
    id: "dynata",
    name: "Dynata",
    tags: ["manual"],
    website: "https://www.dynata.com/",
    optOutUrl: "https://www.dynata.com/privacy-policy/",
    approach: "manual-guided"
  },
  {
    id: "fastbackgroundcheck",
    name: "FastBackgroundCheck",
    tags: ["search-and-optout"],
    website: "https://www.fastbackgroundcheck.com/",
    optOutUrl: "https://www.fastbackgroundcheck.com/optout",
    approach: "manual-guided"
  },
  {
    id: "florida-resident-database",
    name: "Florida Resident Database",
    tags: ["manual-guided"],
    website: "https://www.floridaresidentdatabase.com/",
    optOutUrl: "https://www.floridaresidentdatabase.com/optout",
    approach: "manual-guided"
  },
  {
    id: "golookup",
    name: "GoLookUp",
    tags: ["search-and-optout"],
    website: "https://golookup.com/",
    optOutUrl: "https://golookup.com/optout",
    approach: "manual-guided"
  },
  {
    id: "homemetry",
    name: "Homemetry",
    tags: ["search-and-optout"],
    website: "https://homemetry.com/",
    optOutUrl: "https://homemetry.com/suppression",
    approach: "manual-guided"
  },
  {
    id: "innovis",
    name: "Innovis",
    tags: ["manual"],
    website: "https://www.innovis.com/",
    optOutUrl: "https://www.innovis.com/personal/opt-out",
    approach: "manual-guided"
  },
  {
    id: "instantcheckmate",
    name: "Instant Checkmate",
    tags: ["manual"],
    website: "https://www.instantcheckmate.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  },
  {
    id: "idtrue",
    name: "IdTrue",
    tags: ["manual-guided"],
    website: "https://www.idtrue.com/",
    optOutUrl: "https://www.idtrue.com/optout",
    approach: "manual-guided"
  },
  {
    id: "kiwi-searches",
    name: "Kiwi Searches",
    tags: ["search-and-optout"],
    website: "https://kiwisearches.com/",
    optOutUrl: "https://kiwisearches.com/optout",
    approach: "manual-guided"
  },
  {
    id: "lexisnexis",
    name: "LexisNexis",
    tags: ["manual", "legal"],
    website: "https://www.lexisnexis.com/",
    optOutUrl: "https://optout.lexisnexis.com/",
    approach: "manual-guided"
  },
  {
    id: "locatepeople-org",
    name: "LocatePeople.org",
    tags: ["manual-guided"],
    website: "https://www.locatepeople.org/",
    optOutUrl: "https://www.locatepeople.org/optout",
    approach: "manual-guided"
  },
  {
    id: "michigan-resident-database",
    name: "Michigan Resident Database",
    tags: ["manual-guided"],
    website: "https://www.michiganresidentdatabase.com/",
    optOutUrl: "https://www.michiganresidentdatabase.com/optout",
    approach: "manual-guided"
  },
  {
    id: "mugshots-com",
    name: "Mugshots.com",
    tags: ["manual", "email-request"],
    website: "https://mugshots.com/",
    optOutUrl: "https://mugshots.com/contact.html",
    approach: "manual-guided"
  },
  {
    id: "neighborwho",
    name: "NeighborWho",
    tags: ["manual"],
    website: "https://www.neighborwho.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  },
  {
    id: "nj-parcels",
    name: "NJ Parcels",
    tags: ["manual-guided"],
    website: "https://njparcels.com/",
    optOutUrl: "https://njparcels.com/privacy",
    approach: "manual-guided"
  },
  {
    id: "north-carolina-resident-database",
    name: "North Carolina Resident Database",
    tags: ["manual-guided"],
    website: "https://www.northcarolinaresidentdatabase.com/",
    optOutUrl: "https://www.northcarolinaresidentdatabase.com/optout",
    approach: "manual-guided"
  },
  {
    id: "numberville",
    name: "Numberville",
    tags: ["search-and-optout"],
    website: "https://numberville.com/",
    optOutUrl: "https://numberville.com/optout",
    approach: "manual-guided"
  },
  {
    id: "numlookup",
    name: "Numlookup",
    tags: ["manual-guided"],
    website: "https://www.numlookup.com/",
    optOutUrl: "https://www.numlookup.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "ohio-resident-database",
    name: "Ohio Resident Database",
    tags: ["manual-guided"],
    website: "https://www.ohioresidentdatabase.com/",
    optOutUrl: "https://www.ohioresidentdatabase.com/optout",
    approach: "manual-guided"
  },
  {
    id: "officialusa",
    name: "OfficialUSA",
    tags: ["search-and-optout"],
    website: "https://www.officialusa.com/",
    optOutUrl: "https://www.officialusa.com/optout.php",
    approach: "manual-guided"
  },
  {
    id: "openpublicrecords",
    name: "OpenPublicRecords",
    tags: ["manual-guided"],
    website: "https://openpublicrecords.com/",
    optOutUrl: "https://openpublicrecords.com/contact",
    approach: "manual-guided"
  },
  {
    id: "ownerly",
    name: "Ownerly",
    tags: ["manual-guided"],
    website: "https://www.ownerly.com/",
    optOutUrl: "https://www.ownerly.com/opt-out/",
    approach: "manual-guided"
  },
  {
    id: "okcaller",
    name: "OkCaller",
    tags: ["manual-guided"],
    website: "https://www.okcaller.com/",
    optOutUrl: "https://www.okcaller.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "peekyou",
    name: "PeekYou",
    tags: ["manual-guided"],
    website: "https://www.peekyou.com/",
    optOutUrl: "https://www.peekyou.com/about/contact/optout/index.php",
    approach: "manual-guided"
  },
  {
    id: "peoplefinders",
    name: "PeopleFinders",
    tags: ["manual"],
    website: "https://www.peoplefinders.com/",
    optOutUrl: "https://www.peoplefinders.com/manage/",
    approach: "manual-guided"
  },
  {
    id: "peoplelooker",
    name: "PeopleLooker",
    tags: ["manual"],
    website: "https://www.peoplelooker.com/",
    optOutUrl: "https://www.peoplelooker.com/optout",
    approach: "manual-guided"
  },
  {
    id: "peoplesmart",
    name: "PeopleSmart",
    tags: ["manual"],
    website: "https://www.peoplesmart.com/",
    optOutUrl: "https://www.peoplesmart.com/optout",
    approach: "manual-guided"
  },
  {
    id: "peoplewhiz",
    name: "PeopleWhiz",
    tags: ["manual-guided"],
    website: "https://www.peoplewhiz.com/",
    optOutUrl: "https://www.peoplewhiz.com/optout",
    approach: "manual-guided"
  },
  {
    id: "persopo",
    name: "Persopo",
    tags: ["manual-guided"],
    website: "https://persopo.com/",
    optOutUrl: "https://persopo.com/optout",
    approach: "manual-guided"
  },
  {
    id: "pipl",
    name: "Pipl",
    tags: ["manual"],
    website: "https://pipl.com/",
    optOutUrl: "https://pipl.com/privacy",
    approach: "manual-guided"
  },
  {
    id: "publicrecords-com",
    name: "PublicRecords.com",
    tags: ["manual-guided"],
    website: "https://www.publicrecords.com/",
    optOutUrl: "https://www.publicrecords.com/optout",
    approach: "manual-guided"
  },
  {
    id: "publicrecordsnow",
    name: "PublicRecordsNow",
    tags: ["manual-guided"],
    website: "https://www.publicrecordsnow.com/",
    optOutUrl: "https://www.publicrecordsnow.com/optout",
    approach: "manual-guided"
  },
  {
    id: "sagestream",
    name: "SageStream",
    tags: ["manual", "credit-data"],
    website: "https://www.sagestreamllc.com/",
    optOutUrl: "https://www.sagestreamllc.com/opt-out-opt-in/",
    approach: "manual-guided"
  },
  {
    id: "searchpublicrecords",
    name: "SearchPublicRecords",
    tags: ["manual-guided"],
    website: "https://www.searchpublicrecords.com/",
    optOutUrl: "https://www.searchpublicrecords.com/optout",
    approach: "manual-guided"
  },
  {
    id: "spydialer",
    name: "SpyDialer",
    tags: ["manual-guided"],
    website: "https://www.spydialer.com/",
    optOutUrl: "https://www.spydialer.com/opt-out",
    approach: "manual-guided"
  },
  {
    id: "truthfinder",
    name: "TruthFinder",
    tags: ["manual"],
    website: "https://www.truthfinder.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  },
  {
    id: "truecaller",
    name: "TrueCaller",
    tags: ["phone-data", "manual-guided"],
    website: "https://www.truecaller.com/",
    optOutUrl: "https://www.truecaller.com/unlisting",
    approach: "manual-guided"
  },
  {
    id: "us-search",
    name: "US Search",
    tags: ["manual"],
    website: "https://www.ussearch.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  },
  {
    id: "zabasearch",
    name: "ZabaSearch",
    tags: ["manual"],
    website: "https://www.zabasearch.com/",
    optOutUrl: "https://suppression.peopleconnect.us/login",
    approach: "manual-guided"
  }
];

module.exports = { providers };
