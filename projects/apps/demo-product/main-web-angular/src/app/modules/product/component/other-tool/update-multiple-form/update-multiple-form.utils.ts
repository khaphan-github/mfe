export class UpdateMultipeFormUtils {
  // Change any type to your Cass
  public static mapFormToItems(items: Array<any>, formData: any) {
    if (!items || !formData) {
      throw new Error('Items and formData are required.');
    }
    return items.map(item => {
      const updatedItem = { ...item };

      // Map your data from form;
      updatedItem.description = formData.description;
      updatedItem.fileDetails = formData.fileDetails;

      return updatedItem;
    });
  }
}
