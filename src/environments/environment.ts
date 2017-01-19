// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
let getEmailRegex =  function() {
  let sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  let sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  let sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  let sQuotedPair = '\\x5c[\\x00-\\x7f]';
  let sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  let sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  let sDomain_ref = sAtom;
  let sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  let sWord = '(' + sAtom + '|' + sQuotedString + ')';
  let sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  let sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  let sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec

  return '^' + sAddrSpec + '$'; // as whole string
};

export const environment = {
  production: false,
  apiPath: 'http://localhost:88/mlodeWilkiBackend/public/api/',
  pageTitle: 'Mlode wilki - local',
  showLogs: true,
  patterns: {
    email: getEmailRegex(),
    password: '^[a-zA-Z0-9!@#$%^&*_+-?]+$',
    nickname: '^[a-zA-Z0-9_-]+$',
    dateRegex: /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/,
    dateStr: 'YYYY/MM/DD HH:mm',
    number: '^[0123456789]+'
  }
};
