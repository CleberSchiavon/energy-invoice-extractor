export enum HttpStatusMessages {
  IS_NOT_CEMIG_INVOICE = 'Erro ao tentar processar sua fatura, verifique se o documento que você enviou é uma fatura CEMIG',
  ERROR_PROCESSING_INVOICES = 'Erro ao processar faturas:',
  ERROR_GETIING_ALL_INVOICES = 'Erro ao obter todas as faturas:',
  ERROR_CREATING_INVOICES = 'Erro ao criar faturas no banco de dados:',
  PDF_PROCESSING_SUCCESSFULLY = 'PDF processado com sucesso',
  PDF_EXTRACT_DATA_ERROR = 'Erro ao extrair dados do PDF',
  ERROR_CALLING_NEW_INVOICE = 'Ocorreu um erro ao chamar a rota /new-invoice:',
  ERROR_GETTING_INVOICE = 'Ocorreu um erro ao tentar obter uma fatura:',
  CLIENT_NUMBER_NOT_FOUND = 'Não foram encontradas faturas com esse número de cliente',
}
